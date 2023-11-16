import unittest

def create_test_suite():
    # Create a test loader that will discover and load all test cases
    loader = unittest.TestLoader()

    # Start the test suite
    suite = unittest.TestSuite()

    # Discover and add all test cases in the 'tests' directory and subdirectories
    suite.addTests(loader.discover(start_dir='./', pattern='tc*.py'))


    return suite

if __name__ == "__main__":
    # Create the test suite
    test_suite = create_test_suite()

    # Create a test runner
    runner = unittest.TextTestRunner(verbosity=2)

    print("=============== Begin to execute test suite ===============")
    # Run the test suite
    result = runner.run(test_suite)

    # Check the test result (0 means all tests passed, non-zero means failures)
    if result.wasSuccessful():
        exit(0)
    else:
        exit(1)
