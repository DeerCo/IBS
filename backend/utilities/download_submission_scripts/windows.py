import json
import subprocess
import sys
import time


def download(path, task):
	file = open(path, "r")
	submissions = json.loads(file.read())["result"]

	p = subprocess.Popen(["powershell.exe", "mkdir " + task + "_submissions"], stdout=sys.stdout)
	p.communicate()

	curr = 1
	for submission in submissions:
		commands = [
			"cd " + task + "_submissions",
			"mkdir " + submission["group_name"],
			"cd " + submission["group_name"],
			"git clone " + submission["ssh_clone_url"],
			"cd " + task,
			"git checkout " + submission["commit_id"],
			"rm -Recurse -Force .git"
		]

		p = subprocess.Popen(["powershell.exe", ";".join(commands)], stdout=subprocess.DEVNULL, stderr=sys.stderr)
		p.communicate()

		print("Progress: " + str(curr) + "/" + str(len(submissions)))
		curr += 1
		time.sleep(2)


download("./response.json", "test")
