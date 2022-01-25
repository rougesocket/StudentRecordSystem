//const api_url = "<heroku_app_url>"
const api_url = "https://registerstud.herokuapp.com/user"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].name}</td>`;
		table_data += `<td>${records[i].department}</td>`;
		table_data += `<td>${records[i].roll_no}</td>`;
		table_data += `<td>${records[i].address}</td>`;
		table_data += `<td>${records[i].course}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-success"><i class="fas fa-edit p-1"></i>Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("name").value = data.name;
		document.getElementById("department").value = data.department;
		document.getElementById("roll_no").value = data.roll_no;
		document.getElementById("address").value = data.address;
		document.getElementById("course").value = data.course;
	})
}


function postData() {
	
	var name = document.getElementById("name").value;
	var department = document.getElementById("department").value;
	var roll_no = document.getElementById("roll_no").value;
	var address = document.getElementById("address").value;
	var course = document.getElementById("course").value;
	
	
	data = {name: name,  department: department,roll_no:roll_no,address:address,course:course};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "index.html";
	})
}	


function putData() {
	
	var _id = document.getElementById("id").value;
	var name = document.getElementById("name").value;
	var department = document.getElementById("department").value;
	var roll_no = document.getElementById("roll_no").value;
	var address = document.getElementById("address").value;
	var course = document.getElementById("course").value;
	
	data = {_id: _id, name: name,  department: department,roll_no:roll_no,address:address,course:course};
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "index.html";
	})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}