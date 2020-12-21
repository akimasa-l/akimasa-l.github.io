import os
s=input()
path=f"./{s}/"
folders=(
    "images",
    "scripts",
    "styles",
)
for folder in folders:
    os.makedirs(path+folder,exist_ok=True)
with open(path+"index.html",mode='w') as f:
    pass