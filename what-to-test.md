# What to test?

1. Existence of methods in controllers (TypeScript automatically test this)
2. Test if functions are being called (ex: If calling the controller method is calling the Model method)
3. Check if response codes and content are correct
4. Check error handling
5. Test null returns from database
6. Integration test (test the api with supertest)
