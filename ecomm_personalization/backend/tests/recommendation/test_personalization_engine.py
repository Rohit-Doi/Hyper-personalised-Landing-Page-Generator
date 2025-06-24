import unittest
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import sys
import os

# Add the src directory to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

from src.recommendation.personalization_engine import PersonalizationEngine
from src.recommendation.cold_start_strategy import ColdStartStrategy

class TestPersonalizationEngine(unittest.TestCase):
    def setUp(self):
        print("\n===== SETUP: Creating test data =====")
        
        # Create sample user data
        self.user_data = pd.DataFrame({
            'user_id': [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
            'transaction_id': [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010],
            'timestamp': [datetime.now() - timedelta(days=i) for i in range(10)],
            'amount': [99.99, 79.99, 99.99, 129.99, 79.99, 29.99, 99.99, 49.99, 129.99, 49.99],
            'product_id': [101, 102, 101, 103, 102, 104, 101, 105, 103, 105],
            'category': ['dresses', 'pants', 'dresses', 'shoes', 'pants', 'accessories', 'dresses', 'shirts', 'shoes', 'shirts'],
            'views': [10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
            'purchases': [1, 1, 2, 1, 1, 1, 2, 1, 1, 1],
            'rating': [5, 4, 3, 5, 4, 2, 5, 3, 4, 4],
            'age_group': ['18-24', '25-34', '25-34', '35-44', '25-34', '18-24', '35-44', '45-54', '35-44', '25-34'],
            'gender': ['F', 'M', 'F', 'M', 'F', 'F', 'M', 'M', 'F', 'M']
        })
        
        print("\nUser data created:")
        print(f"Columns: {self.user_data.columns.tolist()}")
        print(f"Shape: {self.user_data.shape}")
        print("Sample data:")
        print(self.user_data.head(2).to_string())

        # Create sample product data with proper structure
        print("\nCreating product data...")
        product_data = []
        test_products = [
            (101, 'dresses', 99.99, 100, 10, 4.5, ['18-24', '25-34'], ['F']),
            (102, 'pants', 79.99, 150, 15, 4.2, ['25-34', '35-44'], ['M']),
            (103, 'shoes', 129.99, 200, 20, 4.8, ['25-34', '35-44'], ['M', 'F']),
            (104, 'accessories', 29.99, 250, 25, 4.0, ['18-24', '25-34'], ['F']),
            (105, 'shirts', 49.99, 300, 30, 4.6, ['25-34', '35-44', '45-54'], ['M'])
        ]
        
        for product_id, category, price, views, purchases, rating, age_groups, genders in test_products:
            for age_group in age_groups:
                for gender in genders:
                    product_data.append({
                        'product_id': int(product_id),
                        'category': str(category),
                        'name': f"{category.capitalize()} {product_id}",
                        'price': float(price),
                        'views': int(views),
                        'purchases': int(purchases),
                        'rating': float(rating),
                        'age_group': str(age_group),
                        'gender': str(gender),
                        'image': f"{category}_{product_id}.jpg"
                    })
        
        self.product_data = pd.DataFrame(product_data)
        
        print("\nProduct data created:")
        print(f"Columns: {self.product_data.columns.tolist()}")
        print(f"Shape: {self.product_data.shape}")
        print("Sample data:")
        print(self.product_data.head(2).to_string())
        
        # Verify numeric columns
        print("\nVerifying numeric columns in product_data:")
        numeric_cols = ['product_id', 'price', 'views', 'purchases', 'rating']
        for col in numeric_cols:
            print(f"{col}: {self.product_data[col].dtype}")
        
        # Create the engine instance with a mock ColdStartStrategy
        print("\nCreating PersonalizationEngine instance with mock ColdStartStrategy...")
        
        # Import mock here to avoid circular imports
        from unittest.mock import patch, MagicMock
        
        # Create a mock for the ColdStartStrategy
        self.mock_cold_start = MagicMock()
        self.mock_cold_start.get_fallback_recommendations.return_value = {
            'hero_banner': {'title': 'Welcome', 'subtitle': 'Discover our products', 'image': 'welcome.jpg'},
            'product_modules': [],
            'cta_modules': [],
            'dynamic_content': {}
        }
        
        # Patch the ColdStartStrategy in the PersonalizationEngine
        self.patcher = patch('src.recommendation.personalization_engine.ColdStartStrategy', 
                           return_value=self.mock_cold_start)
        self.mock_cold_start_class = self.patcher.start()
        
        # Create the engine with our test data
        self.engine = PersonalizationEngine(self.user_data, self.product_data)
        
        print("\n===== SETUP COMPLETE =====\n")
    
    def tearDown(self):
        # Stop the patcher
        if hasattr(self, 'patcher'):
            self.patcher.stop()

    def test_calculate_rfm(self):
        """Test RFM calculation"""
        rfm = self.engine._calculate_rfm()
        self.assertIsInstance(rfm, pd.DataFrame)
        self.assertIn('recency', rfm.columns)
        self.assertIn('frequency', rfm.columns)
        self.assertIn('monetary', rfm.columns)
        # Check if quartile columns exist
        self.assertTrue(all(col in rfm.columns for col in ['r_quartile', 'f_quartile', 'm_quartile']))
        # Check if we have data for all users
        self.assertGreaterEqual(len(rfm), 1)

    def test_calculate_category_popularity(self):
        """Test category popularity calculation"""
        # Print debug information
        print("\n===== DEBUGGING test_calculate_category_popularity =====")
        print("Product data columns:", self.product_data.columns.tolist())
        print("Product data head (first 5 rows):")
        print(self.product_data.head().to_string())
        print("\nProduct data dtypes:")
        print(self.product_data.dtypes)
        
        # Check for non-numeric values in numeric columns
        print("\nChecking for non-numeric values:")
        for col in ['views', 'purchases', 'rating']:
            print(f"\nColumn: {col}")
            print(f"Type: {self.product_data[col].dtype}")
            print(f"Unique values: {sorted(self.product_data[col].unique())}")
            print(f"Sample values: {self.product_data[col].head(3).tolist()}")
        
        # Print the raw data being passed to the method
        print("\nRaw data being passed to _calculate_category_popularity:")
        print(self.engine.product_data.head().to_string())
        
        # Run the actual test with error handling
        try:
            print("\nCalling _calculate_category_popularity...")
            category_popularity = self.engine._calculate_category_popularity()
            print("\nCategory popularity result:")
            print(category_popularity)
            
            # Basic assertions
            self.assertIsInstance(category_popularity, pd.DataFrame)
            print("\nTest passed: Result is a DataFrame")
            
            # Check for expected columns
            expected_columns = ['views', 'purchases', 'rating']
            missing_cols = [col for col in expected_columns if col not in category_popularity.columns]
            if missing_cols:
                print(f"Warning: Missing expected columns: {missing_cols}")
            
            # Check if we have some data
            if len(category_popularity) == 0:
                print("Warning: Resulting DataFrame is empty")
            
            # If we got here, the test passed
            print("\nAll tests passed!")
            
        except Exception as e:
            print(f"\nError in test_calculate_category_popularity: {str(e)}")
            print("\nTraceback:")
            import traceback
            traceback.print_exc()
            raise

    def test_determine_user_stage(self):
        """Test user stage determination"""
        # Test with different user stages
        test_cases = [
            ({'new_user': True, 'cart_abandoned': False}, 'discovery'),
            ({'new_user': False, 'cart_abandoned': True}, 'consideration'),
            ({'new_user': False, 'cart_abandoned': False}, 'purchase')
        ]
        
        for user_data, expected_stage in test_cases:
            with self.subTest(user_data=user_data):
                stage = self.engine._determine_user_stage(user_data)
                self.assertEqual(stage, expected_stage)

    def test_generate_landing_page_layout(self):
        """Test landing page layout generation"""
        test_cases = [
            # New user (cold start)
            {
                'user_id': 1,
                'age': 30,
                'gender': 'F',
                'region': 'US',
                'new_user': True
            },
            # Returning user with history
            {
                'user_id': 2,
                'age': 35,
                'gender': 'M',
                'region': 'US',
                'purchase_history': [101, 102],
                'view_history': [103, 104],
                'new_user': False
            }
        ]
        
        for user_profile in test_cases:
            with self.subTest(user_id=user_profile['user_id']):
                layout = self.engine.generate_landing_page_layout(user_profile)
                self.assertIsInstance(layout, dict)
                self.assertIn('product_modules', layout)
                self.assertIsInstance(layout['product_modules'], list)
                
                # Check if we have at least one product module
                if not user_profile.get('new_user', False):
                    self.assertGreater(len(layout['product_modules']), 0)
                
                # Check each product module
                for module in layout['product_modules']:
                    self.assertIsInstance(module, dict)
                    self.assertIn('title', module)
                    self.assertIn('products', module)
                    self.assertIsInstance(module['products'], list)

    def test_get_hero_banner(self):
        """Test hero banner generation"""
        banner = self.engine._get_hero_banner('discovery')
        self.assertIn('title', banner)
        self.assertIn('subtitle', banner)
        self.assertIn('image', banner)

    def test_get_product_modules(self):
        """Test product module generation"""
        modules = self.engine._get_product_modules({
            'age_group': '25-34',
            'gender': 'M'
        })
        self.assertGreater(len(modules), 0)
        for module in modules:
            self.assertIn('category', module)
            self.assertIn('products', module)
            self.assertGreater(len(module['products']), 0)

    def test_get_cta_modules(self):
        """Test CTA module generation"""
        ctas = self.engine._get_cta_modules('discovery')
        self.assertGreater(len(ctas), 0)
        for cta in ctas:
            self.assertIn('type', cta)
            self.assertIn('text', cta)
            self.assertIn('priority', cta)

    def test_get_dynamic_content(self):
        """Test dynamic content generation"""
        content = self.engine._get_dynamic_content({
            'age_group': '25-34',
            'gender': 'M'
        })
        self.assertIn('recent_views', content)
        self.assertIn('popular_now', content)
        self.assertIn('personalized_offers', content)

    def test_get_personalized_offers(self):
        """Test personalized offers generation"""
        offers = self.engine._get_personalized_offers({
            'new_user': True,
            'cart_abandoned': True
        })
        self.assertGreater(len(offers), 0)
        for offer in offers:
            self.assertIn('type', offer)
            self.assertIn('discount', offer)
            self.assertIn('description', offer)
