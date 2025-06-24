import sys
import os

# Add the src directory to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), 'src')))

try:
    # Run the tests
    import unittest
    from tests.recommendation.test_personalization_engine import TestPersonalizationEngine
    
    # Create test suite and run it
    suite = unittest.TestLoader().loadTestsFromTestCase(TestPersonalizationEngine)
    test_result = unittest.TextTestRunner(verbosity=2).run(suite)
    
    # Exit with non-zero code if there were failures or errors
    sys.exit(not test_result.wasSuccessful())
    
except Exception as e:
    print(f"Error running tests: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
