import os
import json

class Scanner:
    def __init__(self, file):
        self.file = file

    def scan():
        raise NotImplementedError('Scan method is not implemented.')

    def read_json(file):
        with open(file) as json_data:
            d = json.load(json_data)
            return d

    @classmethod
    def need_scan(file):
        exts = ['package.json', 'bower.json', 'requirements.txt', '.csproj']
        for ext in exts:
            if ext in file:
                return True
        return False

class NodeScanner(Scanner):
    def scan():
        p = self.read_json(self.file)
        


src = '.'
for root, dirs, files in os.walk(src):
