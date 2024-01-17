// File Upload
// 
function ekUpload(){
    function Init() {
  
      var fileSelect    = document.getElementById('file-upload'),
          fileDrag      = document.getElementById('file-drag');
  
        fileSelect.addEventListener('change', fileSelectHandler, false);
      
        fileDrag.addEventListener('dragover', fileDragHover, false);
        fileDrag.addEventListener('dragleave', fileDragHover, false);
        fileDrag.addEventListener('drop', fileSelectHandler, false);
    }
  
    function fileDragHover(e) {
      var fileDrag = document.getElementById('file-drag');
  
      e.stopPropagation();
      e.preventDefault();
  
      fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
    }
  
    function fileSelectHandler(e) {
      // Fetch FileList object
      var files = e.target.files || e.dataTransfer.files;
  
      // Cancel event and hover styling
      fileDragHover(e);
  
      // Process all File objects
      for (var i = 0, f; f = files[i]; i++) {
        uploadFile(f);
      }
    }
  

    function uploadFile(file) {
        const fileSizeLimit = 100; // In MB
      
        if (file.size <= fileSizeLimit * 1024 * 1024) {

            document.getElementById('file-upload-form').submit();
            
        } else {
          const messagesElement = document.getElementById('file-drag');
        
          // Check if errorMessageElement already exists
          const errorMessageElement = messagesElement.querySelector('.error-message');
          
          if (!errorMessageElement) {
              // Display message in a new p element
              const newErrorMessageElement = document.createElement('p');
              newErrorMessageElement.textContent = 'Please upload a smaller file (< ' + fileSizeLimit + ' MB).';
              newErrorMessageElement.style.color = 'red';
              newErrorMessageElement.className = 'error-message';
              messagesElement.appendChild(newErrorMessageElement);
          }
        }
      }
      
    // Check for the various File API support.
    if (window.File && window.FileList && window.FileReader) {
      Init();
    } else {
      document.getElementById('file-drag').style.display = 'none';
    }
  }
  ekUpload();