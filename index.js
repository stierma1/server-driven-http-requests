
var uuid = require("uuid");
var $ = require("jquery");

module.exports = function(HttpRequest){
  return {
    load : function(rerender, dataSources){

      return {
        render: function(){
          var nameUuid = uuid.v4();
          var nameField = $("<input type='text'></input>").attr("id",nameUuid);
          var serverUrlUuid = uuid.v4();
          var serverUrlField = $("<input type='text'></input>").attr("id",serverUrlUuid);
          var intervalUuid = uuid.v4();
          var intervalField = $("<input type='text'></input>").attr("id",intervalUuid);
          var requestObjUuid = uuid.v4();
          var requestObjField = $("<textarea></textarea>").attr("id",requestObjUuid);
          var submitUuid = uuid.v4();
          var submitButton = $("<input type='button' value='Create'></input>").attr("id",submitUuid);

          submitButton.click(function(){
            var key = nameField.val();
            var serverUrl = serverUrlField.val();
            var requestObj = JSON.parse(requestObjField.val());
            var interval = parseInt(intervalField.val());
            if(key && serverUrl && requestObj){
              dataSources.set(key, new HttpRequest({url:serverUrl, method:"post", body:requestObj}, interval || null));
              rerender();
            }
          })

          return $("<div></div>").append("<span>Name: </span>")
            .append(nameField)
            .append("<span>Server Url: </span>")
            .append(serverUrlField)
            .append("<span>Interval: </span>")
            .append(intervalField)
            .append("<span>Request Object: </span>")
            .append(requestObjField)
            .append($("<div></div>").append(submitButton));
        },
        unload : function(){

        }
      };
    }
  };
}
