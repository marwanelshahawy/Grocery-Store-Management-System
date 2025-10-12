$(function () {
    // Load orders table
    $.get(orderListApiUrl, function (response) {
        if (response) {
            var table = '';
            var totalCost = 0;

            $.each(response, function (index, order) {
                totalCost += parseFloat(order.total);
                var orderDateObj = new Date(order.Datetime);
                orderDateObj.setHours(orderDateObj.getHours() - 3);
                var orderDate = orderDateObj.toLocaleString('en-EG');

                table += `
                    <tr data-order-id="${order.order_id}">
                        <td>${orderDate}</td>
                        <td>${order.order_id}</td>
                        <td>${order.customer_name}</td>
                        <td>${order.total.toFixed(2)} EGP</td>
                        <td>
                            <button class="btn btn-xs btn-info view-receipt">View Receipt</button>
                        </td>
                    </tr>
                `;
            });

            table += `
                <tr>
                    <td colspan="4" style="text-align:end"><b>Total</b></td>
                    <td><b>${totalCost.toFixed(2)} EGP</b></td>
                </tr>
            `;
            $("table tbody").html(table);
        }
    });

    // Handle "View Receipt" click
    $(document).on("click", ".view-receipt", function (e) {
        e.preventDefault();
        var orderId = $(this).closest("tr").data("order-id");
        if (!orderId) return alert("Order ID not found!");

        $.get(orderDetailsApiUrl + "?order_id=" + orderId, function (response) {
            if (!response) return alert("No order details found for this order.");

            var receiptHtml = generateReceiptHtml(response);
            $("#receiptContent").html(receiptHtml);

            $("#receiptModal").addClass("in").show();
            $("body").addClass("modal-open");
        }).fail(function (xhr, status, error) {
            console.error("Error:", error);
            alert("Error loading order details: " + error);
        });
    });

    // Print receipt
    $(document).on("click", "#printReceipt", function () {
        var printWindow = window.open('', '', 'height=600,width=400');
        var receiptContent = $("#receiptContent").html();

        printWindow.document.write(`
            <html>
                <head>
                    <title>Order Receipt</title>
                    <link rel="stylesheet" href="css/bootstrap.min.css">
                </head>
                <body style="font-family: 'Courier New', monospace; background-color: #fefefe; padding: 20px;">
                    ${receiptContent}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    });

    // Close modal
    $(document).on("click", ".close, [data-dismiss='modal']", function () {
        $("#receiptModal").removeClass("in").hide();
        $("body").removeClass("modal-open");
    });
});


// ✅ Generate Styled Receipt HTML
function generateReceiptHtml(orderDetails) {
    var orderDateObj = new Date(orderDetails.Datetime);
    orderDateObj.setHours(orderDateObj.getHours() - 3);
    var orderDate = orderDateObj.toLocaleString('en-EG');

    return `
        <style>
            .receipt-box {
                max-width: 360px;
                margin: auto;
                background: white;
                border: 1px solid #ddd;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                font-size: 14px;
                line-height: 1.5;
                font-family: 'Courier New', monospace;
            }
            .receipt-box h3 {
                margin: 0;
                font-weight: bold;
            }
            .receipt-header {
                text-align: center;
                border-bottom: 1px dashed #aaa;
                padding-bottom: 10px;
                margin-bottom: 10px;
            }
            .receipt-details p {
                margin: 0;
            }
            table.receipt-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }
            table.receipt-table th, table.receipt-table td {
                border-bottom: 1px dashed #ccc;
                padding: 6px 0;
                text-align: left;
            }
            table.receipt-table th {
                font-weight: bold;
            }
            .total-row th, .total-row td {
                border-top: 2px solid #000;
                font-weight: bold;
            }
            .receipt-footer {
                text-align: center;
                border-top: 1px dashed #aaa;
                margin-top: 10px;
                padding-top: 8px;
                font-size: 13px;
                color: #555;
            }
            .btn-group {
                text-align: center;
                margin-top: 10px;
            }
            .btn-group button {
                margin: 5px;
            }
        </style>

        <div class="receipt-box">
            <div class="receipt-header">
                <h3>🛒 GROCERY STORE</h3>
                <small>Order Receipt</small>
            </div>

            <div class="receipt-details">
                <p><b>Order ID #</b> ${orderDetails.order_id}</p>
                <p><b>Customer:</b> ${orderDetails.customer_name}</p>
                <p><b>Date:</b> ${orderDate}</p>
            </div>

            <table class="receipt-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th style="text-align:center;">Qty</th>
                        <th style="text-align:right;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${orderDetails.order_details.map(item => `
                        <tr>
                            <td>${item.product_name.trim()}</td>
                            <td style="text-align:center;">${item.quantity}</td>
                            <td style="text-align:right;">${item.total_price} EGP</td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr class="total-row">
                        <th colspan="2">Grand Total</th>
                        <th style="text-align:right;">${orderDetails.total} EGP</th>
                    </tr>
                </tfoot>
            </table>


            <div class="receipt-footer">
                <p>Thank you for your purchase!</p>
            </div>
        </div>
    `;
}
