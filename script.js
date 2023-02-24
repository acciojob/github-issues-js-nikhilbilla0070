//your code here
const issueList = document.getElementById('issue-list');
    const pageNum = document.getElementById('page-num');
    let currentPage = 1;

    function displayIssues(issues) {
      issueList.innerHTML = '';
      issues.forEach(issue => {
        const listItem = document.createElement('li');
        listItem.innerText = issue.title;
        issueList.appendChild(listItem);
      });
    }

    function fetchIssues(pageNumber) {
      fetch(`https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5`)
        .then(response => response.json())
        .then(data => {
          displayIssues(data);
          currentPage = pageNumber;
          pageNum.innerText = `Page number ${currentPage}`;
        })
        .catch(error => console.log(error));
    }

    // Initial page load
    fetchIssues(currentPage);

    // Load next page
    document.getElementById('load-next').addEventListener('click', () => {
      fetchIssues(currentPage + 1);
    });

    // Load previous page
    document.getElementById('load-prev').addEventListener('click', () => {
      if (currentPage > 1) {
        fetchIssues(currentPage - 1);
      } else {
        fetchIssues(1); // load first page when on second page
      }
    });