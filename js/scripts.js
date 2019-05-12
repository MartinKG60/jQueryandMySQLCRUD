$(function() {
    // GET/READ
    $("#get-button").on("click", function() {
        $.ajax({
            url: "/getposts",
            content: "application/json",
            success: function(response) {
                const tbodyEl = $("tbody");

                tbodyEl.html("");

                response.forEach(function(post) {
                    tbodyEl.append("\
                        <tr>\
                            <td class='id'>" + post.id + "</td>\
                            <td><input type='text' class='name' value='" + post.title + "'></td>\
                            <td>\
                                <button class='update-button'>UPDATE/PUT</button>\
                                <button class='delete-button'>DELETE</button>\
                            </td>\
                        </tr>\
                    ");
                });
            }
        });
    });

    // Create/POST
    $("#create-form").on("submit", function() {
        event.preventDefault();

        const createInput = $("#create-input");

        $.ajax({
            url: "/create-post",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({ title: createInput.val() }),
            success: function(response) {
                createInput.val("");
                $("#get-button").click();
            }
        });
    });

    // UPDATE/PUT
    $("table").on("click", ".update-button", function() {
        const rowEl = $(this).closest("tr");
        const id = rowEl.find(".id").text();
        const newTitle = rowEl.find(".name").val();

        $.ajax({
            url: "/updatepost/" + id,
            method: "GET",
            contentType: "application/json",
            data: ({ newTitle: newTitle }),
            success: function(response) {
                $("#get-button").click();
            }
        });
    });

    // DELETE
    $("table").on("click", ".delete-button", function() {
        const rowEl = $(this).closest("tr");
        const id = rowEl.find(".id").text();

        $.ajax({
            url: "/deletepost/" + id,
            method: "DELETE",
            contentType: "application/json",
            success: function(response) {
                $("#get-button").click();
            }
        });
    });
});