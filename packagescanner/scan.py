import os
import json
import requirements
import xml.etree.ElementTree as ET


class Scanner:
    def __init__(self, file):
        self.file = file

    def scan(self):
        raise NotImplementedError('Scan method is not implemented.')

    def read_json(self, file):
        with open(file) as json_data:
            d = json.load(json_data)
            return d

    @classmethod
    def need_scan(self, file):
        exts = ['package.json', 'bower.json', 'requirements.txt', '.csproj']
        for ext in exts:
            if ext in file:
                return True
        return False


class NodeScanner(Scanner):
    def scan(self):
        result = {}
        p = self.read_json(self.file)
        if 'dependencies' in p:
            result = dict(result.items() + p['dependencies'].items())
        if 'devDependencies' in p:
            result = dict(result.items() + p['devDependencies'].items())
        return result


class PythonScanner(Scanner):
    def scan(self):
        result = {}
        with open(self.file, 'r') as f:
            for req in requirements.parse(f):
                result[req.name] = req.specs
        return result


class DncScanner(Scanner):
    def scan(self):
        result = {}
        root = ET.parse(self.file).getroot()
        for dep in root.findall('PackageReference'):
            if dep.get('Include'):
                result[dep.get('Include')] = dep.get('Version')
        return result


class ScannerFactory:
    @classmethod
    def create_scanner(self, file):
        if 'package.json' in file or 'bower.json' in file:
            return NodeScanner(file)
        elif 'requirements.txt' in file:
            return PythonScanner(file)
        elif '.csproj' in file:
            return DncScanner(file)


src = '..'
result = {}
for root, dirs, files in os.walk(src):
    for f in files:
        if Scanner.need_scan(f):
            full_path = os.path.join(root, f)
            scanner = ScannerFactory.create_scanner(full_path)
            packages = scanner.scan()
            result = dict(result.items() + packages.items())
print(result)
