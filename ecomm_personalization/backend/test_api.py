import httpx
import asyncio

BASE_URL = "http://127.0.0.1:8000/api/v1"

async def test_endpoints():
    async with httpx.AsyncClient() as client:
        # Test health check
        print("Testing health check...")
        response = await client.get("http://127.0.0.1:8000/health")
        print(f"Health check: {response.status_code} - {response.json()}")
        
        # Test products endpoint
        print("\nTesting products endpoint...")
        response = await client.get(f"{BASE_URL}/products")
        print(f"Products: {response.status_code} - {len(response.json())} products")
        
        # Test recommendations endpoint
        print("\nTesting recommendations endpoint...")
        response = await client.get(f"{BASE_URL}/recommendations/1")
        print(f"Recommendations for user 1: {response.status_code} - {response.json()}")

if __name__ == "__main__":
    asyncio.run(test_endpoints())
