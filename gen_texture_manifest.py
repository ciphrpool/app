import os
from dataclasses import dataclass
import re
import argparse
from datetime import datetime

DEFAULT_OUTPUT_DIRECTORY = os.path.join(os.path.dirname(__file__),"src","components","canvas","utils")
EXTENSION = ["png","webp","svg"]

@dataclass
class Args :
    dir : str
    out : str


def get_arguments():
    parser = argparse.ArgumentParser(
                    prog='Texture Manifest generator',
                    description='Generates a manifest object with provided textures')
    parser.add_argument("-d","--dir",dest="dir")
    parser.add_argument("-o","--out",dest="out")

    args = parser.parse_args()


    if args.dir is None:
        parser.print_help()
        return None
    
    if args.dir is not None and not os.path.isdir(args.dir):
        print(f"Error : folder {args.dir} does not exist")
        parser.print_help()
        return None
    if args.out is not None and not os.path.isdir(args.out):
        print(f"Error : folder {args.out} does not exist")
        parser.print_help()
        return None
    
    out_dir = DEFAULT_OUTPUT_DIRECTORY if args.out is None else args.out
    return Args(dir=args.dir,out=out_dir)

def walk(folder):
    for root, dirs, files in os.walk(folder, topdown=False):
        if root == folder:
            continue
        if os.path.dirname(root) != folder:
            print(f"WARINING: folder {root} is ignored because it is too deep inside the directory tree")
            continue
        
        for name in files:
            if name.split(".")[-1] in EXTENSION:
                yield (os.path.join(root, name),os.path.basename(root))

def gen_import(file_path):
    filename = os.path.basename(file_path)
    filename_no_ext = os.path.splitext(filename)[0]
    import_name = filename_no_ext.upper()
    path = file_path.replace('\\', '/')
    import_statement = f"import {import_name} from \"@assets/{path}\""
    return import_name, import_statement


def write_manifest_ts(directory, imports, bundles):
    now = datetime.now()
    with open(os.path.join(directory, 'manifest.ts'), 'w') as f:
        
        f.write(f'// AUTO GENERATED FILE \n// generated {now.strftime("%d/%m/%Y")} by {os.path.basename(__file__)}\n')
        for imp in imports:
            f.write(f'{imp};\n')
        f.write('\nconst manifest = {\n    bundles: [\n')
        for bundle in bundles.values():
            f.write(f'        {{\n            name: "{bundle["name"]}",\n            assets: [\n')
            for asset in bundle["assets"]:
                f.write(f'                {{ alias: "{asset["alias"]}", src: {asset["src"]} }},\n')
            f.write('            ]\n        },\n')
        f.write('    ]\n};\n\nexport default manifest;\n')

def main(folder:str,out:str):
    if not os.path.isdir(folder):
        print(f"Error : folder {folder} does not exist")
        return False
    if not os.path.isdir(out):
        print(f"Error : folder {out} does not exist")
        return False
    
    assets_folder = os.path.dirname(folder)
    while os.path.basename(assets_folder) != "assets":
        if os.path.dirname(assets_folder) == assets_folder:
            print("Error : provided folder must comes from the assets folder")
            return False
        assets_folder = os.path.dirname(assets_folder)
    
    imports = []
    bundles = {}

    for (file,bundle) in walk(folder):
        print(f"Processing :: bundle : {bundle} | file : {file} ...")
        file_path = os.path.relpath(file, assets_folder)
        import_name, import_statement = gen_import(file_path)
        
        imports.append(import_statement)
        if bundle not in bundles:
            bundles[bundle] = {
                "name" : bundle,
                "assets" : []
            }
        bundles[bundle]["assets"].append(
            {
                "alias": import_name.lower(),
                "src": import_name
            }
        )
    write_manifest_ts(out, imports, bundles)
    return True


if __name__ == "__main__":
    import time
    args = get_arguments()
    result = False
    starting_time = time.time()

    if args is None:
        result = False
    else :
        result = main(args.dir,args.out)

    end_time = time.time()

    execution_time = end_time - starting_time
    if result :
        print(f"Texture Manifest generator : SUCCESS ({execution_time:.2f}ms)")
    else :
        print(f"Texture Manifest generator : FAILED ({execution_time:.2f}ms)")