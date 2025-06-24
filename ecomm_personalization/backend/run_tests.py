import sys
import os

# Add the src directory to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), 'src')))

try:
    # Try to import the cold start strategy
    from recommendation.cold_start_strategy import ColdStartStrategy
    print("Successfully imported ColdStartStrategy")
    
    # Run the tests
    import unittest
    from tests.recommendation.test_cold_start_strategy import TestColdStartStrategy
    
    # Create test suite and run it
    suite = unittest.TestLoader().loadTestsFromTestCase(TestColdStartStrategy)
    unittest.TextTestRunner(verbosity=2).run(suite)
    
except ImportError as e:
    print(f"Import error: {e}")
    print("Current Python path:")
    for p in sys.path:
        print(f"  {p}")
    
    print("\nCurrent directory:")
    print(f"  {os.getcwd()}")
    
    print("\nFiles in current directory:")
    for f in os.listdir('.'):
        print(f"  {f}")
    
    print("\nFiles in src directory:")
    if os.path.exists('src'):
        for f in os.listdir('src'):
            print(f"  {f}")
