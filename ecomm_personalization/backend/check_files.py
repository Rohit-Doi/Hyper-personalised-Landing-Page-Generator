import os
import sys

def check_file(filepath):
    try:
        with open(filepath, 'rb') as f:
            content = f.read()
            if b'\x00' in content:
                print(f"Found null bytes in: {filepath}")
                return True
        return False
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return False

def scan_directory(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.py'):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        f.read()
                except UnicodeDecodeError:
                    print(f"Encoding issue in: {filepath}")
                except Exception as e:
                    print(f"Error checking {filepath}: {e}")

if __name__ == "__main__":
    print("Scanning for problematic Python files...")
    scan_directory('app')
    print("Scan complete.")
