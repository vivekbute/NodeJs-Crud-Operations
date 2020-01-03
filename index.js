const $ =require("jquery");

$(document).ready(() => {
    $.ajax({
        url: "/MenuItems",
        method: "GET",
        data: {},
        success: data => {
            console.log(data);
            // console.log("inside success");
            let rowData = "";
            data.forEach(item => {
                rowData += `<tr><td>${item.id}</td><td>${item.Item}</td>
                    <td><img style="height:50px;width:50px" src="${item.url}"></td>
                    <td>${item.Price}</td><td><input type="submit" value="Update" onclick=update(${item.id})></td>
                    <td><input type="submit" value="Delete" onclick=deleteFunction(${item.id})></td></tr>`;
            });
            // console.log(rowData);
            $("#emp-table").html(rowData);
        }
    });
});

function addItem(){
    window.location = "http://localhost:4000/addMenu"
}

function update(id){
    // console.log(id);
    // // ajax, put the details on update route
    // $(document).ready(()=>{
    //     $.ajax({
    //         url :'/',
    //         method:'GET',
    //         data: {},

    //     })
    // })
    window.location = "/update/"+id;
}

function deleteFunction(id){
    // console.log(id)
    window.location = "/deleteItem/"+id;
}