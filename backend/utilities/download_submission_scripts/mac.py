import json
import subprocess
import sys
import time
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("-f", "--folder", help="folder to clone submissions to, default=submission", default="submissions")
parser.add_argument(
    "-r", "--response", help="path to response.json, default=./response.json", default="./response.json"
)
parser.add_argument(
    "-s", "--start", help="start from a specific submission in response.json, default=0", default=0, type=int
)
args = parser.parse_args()


file = open(args.response, "r")
submissions = json.loads(file.read())["result"]

p = subprocess.Popen(
    [f"mkdir {args.folder}"],
    shell=True,
    stdout=sys.stdout,
)
p.communicate()

curr = args.start + 1
for submission in submissions[args.start:]:
    commands = [
        "cd " + args.folder,
        "mkdir " + submission["group_name"],
        "cd " + submission["group_name"],
        "git clone " + submission["ssh_clone_url"],
        "cd p2",
        "git checkout " + submission["commit_id"],
    ]

    joined_commands = ";".join(commands)

    p = subprocess.Popen(
        [";".join(commands)],
        shell=True,
        stdout=subprocess.DEVNULL,
        stderr=sys.stderr,
    )
    p.communicate()

    print("Progress: " + str(curr) + "/" + str(len(submissions)))
    curr += 1
    time.sleep(2)
