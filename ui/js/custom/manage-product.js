var productModal = $("#productModal");
    $(function () {

        //JSON data by API call
        $.get(productListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, product) {
                    table += '<tr data-id="'+ product.product_id +'" data-name="'+ product.name +'" data-unit="'+ product.uom_id +'" data-price="'+ product.price_per_unit +'">' +
                        '<td>'+ product.name +'</td>'+
                        '<td>'+ product.unit +'</td>'+
                        '<td>'+ product.price_per_unit +'</td>'+
                        '<td><span class="btn btn-xs btn-warning edit-product">Edit</span> <span class="btn btn-xs btn-danger delete-product">Delete</span></td></tr>';
                });
                $("table").find('tbody').empty().html(table);
            }
        });
    });

    // Save Product
    $("#saveProduct").on("click", function () {
        var data = $("#productForm").serializeArray();
        var requestPayload = {
            name: null,
            uom_id: null,
            price_per_unit: null,
            product_id: null
        };
        
        for (var i=0;i<data.length;++i) {
            var element = data[i];
            switch(element.name) {
                case 'name':
                    requestPayload.name = element.value;
                    break;
                case 'uoms':
                    requestPayload.uom_id = element.value;
                    break;
                case 'price':
                    requestPayload.price_per_unit = element.value;
                    break;
                case 'id':
                    requestPayload.product_id = element.value;
                    break;
            }
        }
        
        // Determine if this is an update or create operation
        var isUpdate = requestPayload.product_id && requestPayload.product_id !== '0';
        
        if (isUpdate) {
            // Update existing product
            callApi("POST", productEditApiUrl, requestPayload);
        } else {
            // Create new product
            callApi("POST", productSaveApiUrl, {
                'data': JSON.stringify(requestPayload)
            });
        }
    });

    $(document).on("click", ".delete-product", function (){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete "+ tr.data('name') +" item?");
        if (isDelete) {
            callApi("POST", productDeleteApiUrl, data);
        }
    });

    $(document).on("click", ".edit-product", function (){
        var tr = $(this).closest('tr');
        var productId = tr.data('id');
        var productName = tr.data('name');
        var productUnit = tr.data('unit');
        var productPrice = tr.data('price');
        
        // Fill the modal with existing data
        $("#id").val(productId);
        $("#name").val(productName);
        $("#price").val(productPrice);
        $("#uoms").val(productUnit);
        
        // Change modal title
        productModal.find('.modal-title').text('Edit Product');
        
        // Show the modal
        productModal.modal('show');
    });

    productModal.on('hide.bs.modal', function(){
        $("#id").val('0');
        $("#name, #unit, #price").val('');
        productModal.find('.modal-title').text('Add New Product');
    });

    productModal.on('show.bs.modal', function(){
        //JSON data by API call
        $.get(uomListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, uom) {
                    options += '<option value="'+ uom.uom_id +'">'+ uom.unit +'</option>';
                });
                $("#uoms").empty().html(options);
            }
        });
    });