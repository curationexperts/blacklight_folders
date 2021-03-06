// This is for the folders edit page
Blacklight.onLoad(function(){

  // Display the drag handle
  $('.dd-handle').removeClass('hidden');

  // Initialize drag-and-drop behavior
  $('.dd').nestable({ maxDepth: 1, dropCallback: function(data){
    allItemsData = $('.dd').nestable('serialize');
    itemsContainer = $('.dd');
    reorderItems(allItemsData, itemsContainer);
  } });

  var reorderItems = function(data, container) {
    var folderId = container.data('folder_id');
    var items = data;
    for(var i in data){
      items[i]['position'] = (parseInt(i) + 1).toString();
    }

    $.ajax({
      type: "PATCH",
      url: '/blacklight/folders/' + folderId + '.json',
      data: { folder: {items_attributes: items}},
      success: function(data, status){
      }
    });

    // Update the position text in the form
    var textElements = $('.dd .position-input');
    for(var i in textElements) {
      textElements[i].value = parseInt(i) + 1;
    }
  };

});
