/* global require, console */
(function () {
    'use strict';
    var fs = require('fs'),
        GithubApi = require('github'),
        headers = {
            'User-Agent': 'download-issues'
        },
        issueFilePath = './skyux2issues.csv',
        issues = [],
        github = new GithubApi({
            host: 'api.github.com',
            protocol: 'https',
            followRedirects: false,
            timeout: 5000
        });

    github.issues.getForRepo({
        owner: 'blackbaud',
        repo: 'skyux2',
        headers: headers, 
        state: 'all',
        per_page: 100
    }, getIssues);

    function getIssues(err, res) {
        if (err) {
            console.log('Something went terribly wrong');
            return false;
        } 

        issues = issues.concat(res.data);
        if (github.hasNextPage(res)) {
            github.getNextPage(res, getIssues);
        } else {
            writeIssuesToFile(issues);
            console.log('Wrote issue data to: ' + issueFilePath);
        }
    }

    function getCsvStringFromProperty(array, property) {
        var i,
            result = [],
            resultString;

        for (i = 0; i < array.length; i++) {
            result.push(array[i][property]);
        }

        resultString = result.join(',');
        return '"' + resultString + '"';
    }

    function getLabels(labels) {
        return getCsvStringFromProperty(labels, 'name');
    }

    function getAssignees(assignees) {
        return getCsvStringFromProperty(assignees, 'login');
    }

    function writeIssuesToFile(issues) {
        var issueCsvString = 'url,id,title,description,labels,assignees,milestone,status' + '\n',
            i,
            issue,
            id,
            issueUrl,
            title,
            description,
            labels,
            milestone,
            status,
            assignees;


        for (i = 0; i < issues.length; i++) {
            issue = issues[i];

            if (!issue.pull_request) {
                id = issue.number;
                issueUrl = 'https://github.com/blackbaud/skyux2/issues/' + issue.number;
                title = '"' + issue.title + '"';
                milestone = issue.milestone ? issue.milestone.title : '';
                status = issue.state;

                description = issue.body ? '"' + issue.body.replace(/"/g, '""') + '"' : '';
                labels = getLabels(issue.labels);
                assignees = getAssignees(issue.assignees);
              

                issueCsvString += issueUrl + ',' + id + ',' + title + ',' + description + ',' + labels + ',' + assignees + ',' + milestone + ',' + status + '\n';
            }
            
        }

        return fs.writeFileSync(issueFilePath, issueCsvString);
    }
})();
