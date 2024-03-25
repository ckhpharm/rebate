document.getElementById('userInput').addEventListener('input', function() {
    const userInput = this.value;
    if (!userInput) {
        clearAutocomplete();
        return;
    }
    fetchSuggestions(userInput);
});

const service_key = 'iwdz/PDhvza6c/9VdtqLBvXyiMaOH9RNy/f/SAdJCbtEjW5meLr7SEJKT8wl80cEIPAccdLbbcDh9eRybkowfg==';

function fetchSuggestions(query) {
    const url = `https://apis.data.go.kr/1471000/DrugPrdtPrmsnInfoService04/getDrugPrdtPrmsnDtlInq03?serviceKey=${service_key}&item_name=${encodeURIComponent(query)}`; // Replace with your actual endpoint
    fetch(url)
    .then(response => response.text()) // Get the response as text
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml")) // Parse the text to XML
    .then(data => {
        console.log('Fetched suggestions:', data);
        displaySuggestionsXML(data);
    })
    .catch(error => {
        console.error('Error fetching suggestions:', error);
    });
}



function displaySuggestionsXML(xmlData) {
    clearAutocomplete();
    const autocompleteList = document.getElementById('autocompleteList');
    const items = xmlData.getElementsByTagName('item'); // 'item' 태그로 각 아이템을 찾습니다.

    Array.from(items).forEach(item => {
        // 'ENTP_NAME' 태그의 정보 추출
        const entpNames = item.getElementsByTagName('ENTP_NAME');
        const entpName = entpNames.length > 0 ? entpNames[0].textContent : 'No ENTP_NAME';

        // 'ANOTHER_TAG' 태그의 정보 추출 (여기서 'ANOTHER_TAG'를 실제 태그명으로 대체하세요.)
        const anotherTags = item.getElementsByTagName('ITEM_NAME');
        const anotherTag = anotherTags.length > 0 ? anotherTags[0].textContent : 'No ANOTHER_TAG';

        // 추출한 정보를 사용하여 div 요소 생성
        const div = document.createElement('div');
        div.innerHTML = `<strong>ENTP_NAME:</strong> ${entpName}<br><strong>ITEM_NAME:</strong> ${anotherTag}`;

        div.addEventListener('click', function() {
            document.getElementById('userInput').value = entpName; // 예시로 ENTP_NAME 값을 입력 필드에 설정합니다.
            clearAutocomplete();
        });
        // 24.03.07 상품명과 회사 이름까지 나오게 하는 건 완료. 그 다음에 할 건 백엔드 구성해서 배포 해보는 것

        autocompleteList.appendChild(div); // autocomplete 리스트에 div를 추가합니다.
    });
}


function clearAutocomplete() {
    const autocompleteList = document.getElementById('autocompleteList');
    autocompleteList.innerHTML = '';
}


// You can keep the fetchData and displayResults functions for when the user selects an item or presses the fetch button.
