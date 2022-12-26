
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})

async function github_create_repo(course_id, group_id, username) {
    let org = "ibs-repo";
    let repo = "course_" + course_id + "_group_" + group_id;

    try {
        var response_create_repo = await octokit.request('POST /orgs/' + org + '/repos', {
            org: org,
            name: repo,
            description: 'A repo for course ' + course_id + " group " + group_id + " at UTM",
            private: true,
            has_issues: true,
            has_projects: false,
            has_wiki: false
        })
    } catch {
        return { success: false, code: "failed_create_repo" }
    }

    let github_url = response_create_repo["data"]["html_url"];

    let result_add_user = await github_add_user(course_id, group_id, username);
    await github_add_user(course_id, group_id, "hanxianxuhuang-invalid");

    if (result_add_user["success"] === true) {
        return { success: true, github_url: github_url }
    } else {
        return { success: false, code: result_add_user["code"] }
    }
}

async function github_add_user(course_id, group_id, username) {
    let org = "ibs-repo";
    let repo = "course_" + course_id + "_group_" + group_id;

    try {
        await octokit.request('PUT /repos/' + org + '/' + repo + '/collaborators/' + username, {
            owner: org,
            repo: repo,
            username: username,
            permission: 'push'
        })
    } catch (err) {
        if (err["status"] === 404) {
            return { success: false, code: "failed_add_user" };
        } else if (err["status"] === 403) {
            return { success: false, code: "invalid" };
        }
    }

    return { success: true };
}