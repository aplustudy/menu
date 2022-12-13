const page_elements = document.getElementsByClassName("page-link");
        Array.from(page_elements).forEach(function(element) {
            element.addEventListener('click', function() {
                document.getElementById('page').value = this.dataset.page;
                document.getElementById('searchForm').submit();
            });
        });
        const btn_search = document.getElementById("btn_search");
        btn_search.addEventListener('click', function() {
            document.getElementById('kw').value = document.getElementById('search_kw').value;
            document.getElementById('page').value = 1;  // 검색버튼을 클릭할 경우 1페이지부터 조회한다.
            document.getElementById('tab').value = document.getElementById('tab').value;
            document.getElementById('searchForm').submit();
        });
        const btn_search_reset = document.getElementById("btn_search_reset");
        btn_search_reset.addEventListener('click', function() {
            document.getElementById('kw').value = ''
            document.getElementById('page').value = 1;
            document.getElementById('tab').value = document.getElementById('tab').value;
            document.getElementById('searchForm').submit();
        });
        const tab0 = document.getElementById("tab0");
        tab0.addEventListener('click', function() {
            document.getElementById('kw').value = document.getElementById('search_kw').value;
            document.getElementById('page').value = 1;  // 검색버튼을 클릭할 경우 1페이지부터 조회한다.
            document.getElementById('tab').value = ''
            document.getElementById('searchForm').submit();
        });
        const tab1 = document.getElementById("tab1");
        tab1.addEventListener('click', function() {
            document.getElementById('kw').value = document.getElementById('search_kw').value;
            document.getElementById('page').value = 1;  // 검색버튼을 클릭할 경우 1페이지부터 조회한다.
            document.getElementById('tab').value = '일반'
            document.getElementById('searchForm').submit();
        });
        const tab2 = document.getElementById("tab2");
        tab2.addEventListener('click', function() {
            document.getElementById('kw').value = document.getElementById('search_kw').value;
            document.getElementById('page').value = 1;  // 검색버튼을 클릭할 경우 1페이지부터 조회한다.
            document.getElementById('tab').value = '오늘 메뉴'
            document.getElementById('searchForm').submit();
        });
        const tab3 = document.getElementById("tab3");
        tab3.addEventListener('click', function() {
            document.getElementById('kw').value = document.getElementById('search_kw').value;
            document.getElementById('page').value = 1;  // 검색버튼을 클릭할 경우 1페이지부터 조회한다.
            document.getElementById('tab').value = '맛집 추천'
            document.getElementById('searchForm').submit();
        });