from typing import List, Dict, Any, Optional, Union
import numpy as np
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import pandas as pd
from datetime import datetime
import json

class RecommendationEngine:
    def __init__(self):
        self.user_profiles = {}
        self.product_features = {}
        self.user_similarity_model = None
        self.scaler = StandardScaler()
        self.is_trained = False
        
    def train(self, user_profiles: List[Dict], products: List[Dict]):
        """Train the recommendation models."""
        if not user_profiles or not products:
            return False
            
        # Process user profiles
        self.user_profiles = {profile['user_id']: profile for profile in user_profiles}
        
        # Process product features
        self.product_features = {product['id']: product for product in products}
        
        # Prepare data for user similarity model
        df_users = self._prepare_user_features(user_profiles)
        
        # Train user similarity model
        if not df_users.empty:
            self._train_user_similarity(df_users)
            self.is_trained = True
            return True
            
        return False
    
    def _prepare_user_features(self, user_profiles: List[Dict]) -> pd.DataFrame:
        """Prepare user features for similarity modeling."""
        if not user_profiles:
            return pd.DataFrame()
            
        # Convert to DataFrame
        df = pd.DataFrame(user_profiles)
        
        # Select and preprocess features
        features = [
            'total_sessions',
            'total_duration_seconds',
            'avg_session_duration',
            'total_page_views',
            'total_product_views',
            'total_add_to_cart',
            'total_purchases',
            'conversion_rate',
            'unique_products_viewed',
            'unique_categories_viewed'
        ]
        
        # Ensure all features exist
        existing_features = [f for f in features if f in df.columns]
        
        # Fill missing values
        df[existing_features] = df[existing_features].fillna(0)
        
        # Scale numeric features
        if not df.empty and existing_features:
            df[existing_features] = self.scaler.fit_transform(df[existing_features])
            
        return df[['user_id'] + existing_features] if 'user_id' in df.columns else pd.DataFrame()
    
    def _train_user_similarity(self, user_features: pd.DataFrame):
        """Train KNN model for user similarity."""
        if user_features.empty or len(user_features) < 2:
            return
            
        # Get feature columns (exclude user_id)
        feature_cols = [col for col in user_features.columns if col != 'user_id']
        
        if not feature_cols:
            return
            
        # Train KNN model
        self.user_similarity_model = NearestNeighbors(
            n_neighbors=min(5, len(user_features)),
            metric='cosine',
            algorithm='auto'
        )
        
        self.user_similarity_model.fit(user_features[feature_cols])
    
    def get_recommendations(
        self,
        user_id: Optional[str] = None,
        context: Optional[Dict[str, Any]] = None,
        n_recommendations: int = 10
    ) -> Dict[str, Any]:
        """Get personalized recommendations for a user."""
        if user_id and user_id in self.user_profiles and self.is_trained:
            return self._get_personalized_recommendations(user_id, n_recommendations)
        return self._get_cold_start_recommendations(context, n_recommendations)
    
    def _get_personalized_recommendations(
        self,
        user_id: str,
        n_recommendations: int
    ) -> Dict[str, Any]:
        """Get recommendations for an existing user."""
        # Get similar users
        similar_users = self._find_similar_users(user_id)
        
        # Get products viewed/purchased by similar users
        recommended_products = self._get_products_from_similar_users(user_id, similar_users)
        
        # If not enough products, add popular products
        if len(recommended_products) < n_recommendations:
            popular_products = self._get_popular_products(
                n=n_recommendations - len(recommended_products),
                exclude_ids=[p['id'] for p in recommended_products]
            )
            recommended_products.extend(popular_products)
        
        return {
            'recommendation_type': 'personalized',
            'user_id': user_id,
            'recommended_products': recommended_products[:n_recommendations],
            'explanation': 'Based on your activity and similar users'
        }
    
    def _get_cold_start_recommendations(
        self,
        context: Optional[Dict[str, Any]],
        n_recommendations: int
    ) -> Dict[str, Any]:
        """Get recommendations for a new/unknown user."""
        # Default to popular products
        recommended_products = self._get_popular_products(n=n_recommendations)
        
        # If context is available, use it to filter/rank products
        if context:
            # Example: Filter by device type if available
            if 'device_type' in context and context['device_type'] == 'mobile':
                recommended_products = [p for p in recommended_products 
                                      if p.get('is_mobile_friendly', True)]
            
            # Example: Filter by time of day
            if 'time_of_day' in context:
                if context['time_of_day'] in ['morning', 'afternoon']:
                    recommended_products = sorted(
                        recommended_products,
                        key=lambda x: x.get('popularity_morning', 0),
                        reverse=True
                    )
                else:
                    recommended_products = sorted(
                        recommended_products,
                        key=lambda x: x.get('popularity_evening', 0),
                        reverse=True
                    )
        
        return {
            'recommendation_type': 'cold_start',
            'context_used': context or {},
            'recommended_products': recommended_products[:n_recommendations],
            'explanation': 'Popular items and trending products'
        }
    
    def _find_similar_users(self, user_id: str, n_similar: int = 5) -> List[Dict]:
        """Find users similar to the given user."""
        if not self.user_similarity_model or user_id not in self.user_profiles:
            return []
            
        # Get user features
        user_features = self._prepare_user_features([self.user_profiles[user_id]])
        
        if user_features.empty:
            return []
            
        # Get feature columns
        feature_cols = [col for col in user_features.columns if col != 'user_id']
        
        # Find similar users
        distances, indices = self.user_similarity_model.kneighbors(
            user_features[feature_cols],
            n_neighbors=min(n_similar + 1, len(self.user_profiles))
        )
        
        # Get similar users (excluding the user themselves)
        similar_users = []
        for i in range(1, len(indices[0])):  # Skip the first one (the user themselves)
            similar_user_id = user_features.iloc[indices[0][i]]['user_id']
            similarity = 1 - distances[0][i]  # Convert distance to similarity
            similar_users.append({
                'user_id': similar_user_id,
                'similarity_score': similarity
            })
            
        return similar_users
    
    def _get_products_from_similar_users(
        self,
        user_id: str,
        similar_users: List[Dict],
        max_products: int = 20
    ) -> List[Dict]:
        """Get products viewed/purchased by similar users."""
        if not similar_users or not self.user_profiles:
            return []
            
        # Get products from similar users
        recommended_products = {}
        
        for similar_user in similar_users:
            similar_user_id = similar_user['user_id']
            similarity_score = similar_user['similarity_score']
            
            if similar_user_id in self.user_profiles:
                user_profile = self.user_profiles[similar_user_id]
                
                # Get products viewed by similar user (if available)
                if 'products_viewed' in user_profile and user_profile['products_viewed']:
                    for product_id in user_profile['products_viewed']:
                        if product_id in self.product_features:
                            if product_id not in recommended_products:
                                recommended_products[product_id] = {
                                    'product': self.product_features[product_id],
                                    'score': similarity_score,
                                    'recommendation_reason': f'Viewed by similar user (similarity: {similarity_score:.2f})'
                                }
                            else:
                                # Increase score if product is recommended by multiple similar users
                                recommended_products[product_id]['score'] += similarity_score
        
        # Sort by score and return top products
        sorted_products = sorted(
            recommended_products.values(),
            key=lambda x: x['score'],
            reverse=True
        )
        
        return [p['product'] for p in sorted_products[:max_products]]
    
    def _get_popular_products(
        self,
        n: int = 10,
        exclude_ids: Optional[List[str]] = None
    ) -> List[Dict]:
        """Get popular products (fallback)."""
        if not self.product_features:
            return []
            
        exclude_ids = exclude_ids or []
        
        # Sort products by popularity (or any other metric)
        sorted_products = sorted(
            [p for p in self.product_features.values() if p['id'] not in exclude_ids],
            key=lambda x: x.get('popularity', 0),
            reverse=True
        )
        
        return sorted_products[:n]
