import requests

# URL of the server
server_url = 'http://localhost:3000/upload'

image_path = r'C:\Users\oatta\OneDrive\Pictures\network_model.png' 

# Send a POST request to the server
try:
    with open(image_path, 'rb') as image_file:
        response = requests.post(server_url, files={'image': image_file})
        if response.status_code == 200:
            print('Image uploaded successfully to Firebase.')
        else:
            print('Failed to upload image:', response.status_code)
except FileNotFoundError:
    print('Image file not found.')
except Exception as e:
    print('An error occurred:', str(e))
