import os

# Define your dictionary for replacement
replacement_dict = {
   # "https://kraulinn.wixsite.com/indigo/resa": "resa.html",
  #  "https://kraulinn.wixsite.com/indigo/archive": "archive.html",

 #   "https://kraulinn.wixsite.com/indigo/news": "news.html",

#"https://kraulinn.wixsite.com/indigo/pravila": "pravila.html",

#"https://kraulinn.wixsite.com/indigo/foto-video": "foto-video.html",

#"https://kraulinn.wixsite.com/indigo/projects-3": "projects-3.html",
#"https://kraulinn.wixsite.com/indigo/contact": "contact.html",
'href="https://kraulinn.wixsite.com/indigo"': 'href="main.html"'

    # "old_string2": "new_string2",
    # Add more replacements as needed
}

# Function to replace strings in a file
def replace_strings_in_file(file_path, replacements):
    if file_path.endswith('.py'):
        return
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Replace strings based on the dictionary
    for old_str, new_str in replacements.items():
        content = content.replace(old_str, new_str)

    # Write the modified content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

# Get the current folder (excluding subfolders)
current_folder = os.getcwd()

# Loop through files in the current folder
for file_name in os.listdir(current_folder):
    file_path = os.path.join(current_folder, file_name)

    # Only process regular files, not folders
    if os.path.isfile(file_path):
        replace_strings_in_file(file_path, replacement_dict)

print("String replacement completed.")
