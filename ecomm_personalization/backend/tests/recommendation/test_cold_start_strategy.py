import unittest
from datetime import datetime, date
import pandas as pd
import numpy as np
from unittest.mock import patch, MagicMock
from src.recommendation.cold_start_strategy import ColdStartStrategy, TimeSlot, UserSegment

class TestColdStartStrategy(unittest.TestCase):
    def setUp(self):
        # Create sample user data with required columns
        self.user_data = pd.DataFrame({
            'user_id': [1, 2, 3, 4, 5],
            'age': [25, 30, 35, 40, 45],
            'gender': ['M', 'F', 'M', 'F', 'M'],
            'region': ['North', 'South', 'East', 'West', 'North'],
            'device_type': ['mobile', 'desktop', 'tablet', 'desktop', 'mobile'],
            'hour_of_day': [10, 14, 20, 9, 16],
            'day_of_week': [0, 2, 4, 1, 3],  # Monday to Friday
            'is_weekend': [0, 0, 0, 0, 0],
            'is_holiday': [0, 0, 0, 0, 0],
            'timestamp': [datetime(2023, 6, 1, 10, 0), datetime(2023, 6, 2, 14, 0), 
                         datetime(2023, 6, 3, 20, 0), datetime(2023, 6, 4, 9, 0), 
                         datetime(2023, 6, 5, 16, 0)]
        })

        # Create sample product data with required columns
        self.product_data = pd.DataFrame({
            'product_id': [101, 102, 103, 104, 105],
            'name': ['Laptop', 'T-Shirt', 'Book', 'Smartphone', 'Jeans'],
            'category': ['Electronics', 'Clothing', 'Books', 'Electronics', 'Clothing'],
            'region': ['North', 'South', 'East', 'West', 'North'],
            'device_type': ['mobile', 'desktop', 'tablet', 'mobile', 'desktop'],
            'device_optimized': ['mobile', 'desktop', 'tablet', 'mobile', 'desktop'],
            'views': [1000, 1500, 2000, 2500, 3000],
            'purchases': [100, 150, 200, 250, 300],
            'rating': [4.5, 4.2, 4.8, 4.6, 4.7],
            'conversion_rate': [0.1, 0.15, 0.2, 0.25, 0.3],
            'price': [999.99, 29.99, 19.99, 799.99, 59.99],
            'image': ['laptop.jpg', 'tshirt.jpg', 'book.jpg', 'phone.jpg', 'jeans.jpg'],
            'timestamp': [datetime(2023, 6, 1, 10, 0)] * 5
        })

        # Initialize strategy with mock data
        with patch('pandas.to_datetime', return_value=pd.Series([datetime(2023, 6, 1, 10, 0)] * 5)):
            self.strategy = ColdStartStrategy(self.user_data, self.product_data)

    def test_get_similar_users(self):
        """Test finding similar users"""
        profile = {
            'age': 30, 
            'gender': 'M', 
            'region': 'North', 
            'device_type': 'mobile',
            'hour_of_day': 14,
            'day_of_week': 2,
            'is_weekend': 0,
            'is_holiday': 0
        }
        similar_users = self.strategy.get_similar_users(profile)
        self.assertEqual(len(similar_users), 5)
        self.assertTrue(all(isinstance(u[0], (int, np.integer)) for u in similar_users))
        self.assertTrue(all(isinstance(u[1], (float, np.floating)) for u in similar_users))

    def test_get_region_based_recommendations(self):
        """Test region-based recommendations"""
        recommendations = self.strategy.get_region_based_recommendations('North')
        self.assertTrue(len(recommendations) <= 5)  # Up to 5 recommendations
        if recommendations:  # Only check if we have recommendations
            self.assertTrue(all(isinstance(p, dict) for p in recommendations))
            self.assertIn('product_id', recommendations[0])
            self.assertIn('name', recommendations[0])
            self.assertIn('price', recommendations[0])

    def test_get_time_based_recommendations(self):
        """Test time-based recommendations"""
        # Test with specific time slot
        recommendations = self.strategy.get_time_based_recommendations(TimeSlot.MORNING)
        self.assertTrue(len(recommendations) <= 5)
        if recommendations:
            self.assertIsInstance(recommendations[0], dict)
            self.assertIn('product_id', recommendations[0])
            
        # Test with current time
        current_recs = self.strategy.get_time_based_recommendations()
        self.assertTrue(len(current_recs) <= 5)

    def test_get_device_based_recommendations(self):
        """Test device-based recommendations"""
        recommendations = self.strategy.get_device_based_recommendations('mobile')
        self.assertTrue(len(recommendations) <= 5)
        if recommendations:
            self.assertIsInstance(recommendations[0], dict)
            self.assertIn('product_id', recommendations[0])
            self.assertIn('device_optimized', recommendations[0] or {})

    def test_get_fallback_recommendations(self):
        """Test fallback recommendations"""
        recommendations = self.strategy.get_fallback_recommendations({
            'device_type': 'mobile',
            'region': 'North',
            'age': 30,
            'gender': 'M',
            'hour_of_day': 14,
            'day_of_week': 2,
            'is_weekend': 0,
            'is_holiday': 0
        })
        
        self.assertIn('hero_banners', recommendations)
        self.assertIn('product_carousels', recommendations)
        self.assertIn('featured_categories', recommendations)
        self.assertIn('cta_modules', recommendations)
        self.assertIn('personalized', recommendations)
        self.assertIn('seasonal_content', recommendations)
        
        # Check structure of product carousels
        if recommendations['product_carousels']:
            self.assertIn('for_you', recommendations['product_carousels'])
            self.assertIn('trending', recommendations['product_carousels'])
            self.assertIn('local_favorites', recommendations['product_carousels'])

    @patch('recommendation.cold_start_strategy.date')
    def test_cta_modules_morning(self, mock_date):
        """Test CTA modules for morning time"""
        # Mock date and time for morning
        mock_date.today.return_value = date(2023, 6, 22)  # Thursday
        mock_date.side_effect = lambda *args, **kw: date(*args, **kw)
        
        with patch('recommendation.cold_start_strategy.datetime') as mock_datetime:
            mock_datetime.now.return_value = datetime(2023, 6, 22, 8, 0)  # 8 AM
            ctas = self.strategy._get_cta_modules()
            
            self.assertGreaterEqual(len(ctas), 2)
            cta_types = [cta['type'] for cta in ctas]
            self.assertIn('explore', cta_types)
            self.assertIn('browse', cta_types)

    @patch('recommendation.cold_start_strategy.date')
    def test_cta_modules_afternoon(self, mock_date):
        """Test CTA modules for afternoon time"""
        mock_date.today.return_value = date(2023, 6, 22)  # Thursday
        mock_date.side_effect = lambda *args, **kw: date(*args, **kw)
        
        with patch('recommendation.cold_start_strategy.datetime') as mock_datetime:
            mock_datetime.now.return_value = datetime(2023, 6, 22, 14, 0)  # 2 PM
            ctas = self.strategy._get_cta_modules()
            
            self.assertGreaterEqual(len(ctas), 2)
            cta_types = [cta['type'] for cta in ctas]
            self.assertIn('browse', cta_types)
            self.assertIn('explore', cta_types)

    @patch('recommendation.cold_start_strategy.date')
    def test_cta_modules_evening(self, mock_date):
        """Test CTA modules for evening time"""
        mock_date.today.return_value = date(2023, 6, 22)  # Thursday
        mock_date.side_effect = lambda *args, **kw: date(*args, **kw)
        
        with patch('recommendation.cold_start_strategy.datetime') as mock_datetime:
            mock_datetime.now.return_value = datetime(2023, 6, 22, 20, 0)  # 8 PM
            ctas = self.strategy._get_cta_modules()
            
            self.assertGreaterEqual(len(ctas), 2)
            cta_types = [cta['type'] for cta in ctas]
            self.assertIn('buy', cta_types)
            self.assertIn('explore', cta_types)
            
    def test_holiday_content(self):
        """Test holiday-specific content"""
        # Mock holiday
        with patch('recommendation.cold_start_strategy.date') as mock_date, \
             patch('recommendation.cold_start_strategy.holidays') as mock_holidays:
            
            mock_date.today.return_value = date(2023, 12, 25)  # Christmas
            mock_date.side_effect = lambda *args, **kw: date(*args, **kw)
            mock_holidays.CountryHoliday.return_value = {date(2023, 12, 25): 'Christmas Day'}
            
            # Get recommendations for Christmas
            recommendations = self.strategy.get_fallback_recommendations({
                'device_type': 'desktop',
                'region': 'US',
                'age': 30,
                'gender': 'M',
                'hour_of_day': 14,
                'day_of_week': 4,
                'is_weekend': 0,
                'is_holiday': 1
            })
            
            # Check if holiday content is included
            self.assertIn('seasonal_content', recommendations)
            self.assertIn('cta_modules', recommendations)
            
            # Check for holiday CTAs
            cta_texts = [cta['text'].lower() for cta in recommendations['cta_modules']]
            self.assertTrue(any('christmas' in text.lower() for text in cta_texts))

if __name__ == '__main__':
    unittest.main()
