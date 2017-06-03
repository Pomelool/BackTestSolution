/*
  Just for integrating use,
  It is not safe to save credentials here as a frontend file,
  this should be retrieved from backend if the user has logined,
  and this basic auth should vary on different users
*/

var produsr = "prodUsername";
var prodsec = "&&KeXt97&sd";
var produrl = "https://api.example.com";

var devusr = "devUsername";
var devsec = "$*rs9D(";
var devurl = "https://staging-api.example.com";

/*
Post method of creating user
*/
function createUser(email, password, confirm_password, first_name, last_name, street_number, apartment_number, street_name, city, state){
  var requestBody = {  'email': email,
                       'password' : password,
                       'confirm_password': confirm_password,
                       'first_name': first_name,
                       'last_name': last_name,
                       'street_number': street_number,
                       'street_name': street_name,
                       'city': city,
                       'state': state
                    };
  if(apartment_number != null){
    requestBody['apartment_number'] = apartment_number;
  }

  $.ajax({
    type: "POST",
    url: produrl + "/user",
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded; application/json',
    username: produsr,
    password: prodsec,
    data: jQuery.param(requestBody),
    success: function (data){
      return data;
    },
    statusCode: {
      401: function() {
        console.log('permission denied, invalid http basic credentials');
      },
      409: function() {
        console.log('user already exists');
      },
      500: function() {
        console.log('internal server error');
      },
      400: function() {
         Console.log('invalid parameters supplied, do not submit with the same parameters');
      }
    }
  });
}


/*
 Get Method of read user
*/
function readUser(user_id){
  $.ajax({
    type: "Get",
    url: devurl + "/user/23234",
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded; application/json',
    username: devusr,
    password: devsec,
    data: jQuery.param({ user_id: user_id
                      }),
    success: function (data){
      return data;
    },
    statusCode: {
      401: function() {
        console.log('permission denied, invalid http basic credentials');
      },
      404: function() {
        console.log('user not found');
      },
      500: function() {
        console.log('internal server error');
      }
    }
  });
}


/*
Delete Method of delete user
*/
function deleteUser(user_id){
  $.ajax({
    type: "DELETE",
    url: devurl + "/user/23234",
    dataType: 'json',
    username: produsr,
    password: prodsec,
    data: jQuery.param({ 'user_id': user_id
                      }),
    success: function (){
      var data = {
        'result': true
      }
      return data;
    },
    statusCode: {
      401: function() {
        data = {
          'result': false,
          'error': 'permission denied, invalid http basic credentials';
        };
        return data;
      },
      404: function(result) {
        data = {
          'result': false,
          'error': 'user not found';
        };
        return data;
      },
      500: function(result) {
        data = {
          'result': false,
          'error': 'internal server error';
        };
      }
    }
  });
}



/*
PUT Method of updating user
*/

function updateUser(user_id, requestBody){
  $.ajax({
    type: "DELETE",
    url: devurl + "/user/23234",
    dataType: 'json',
    contentType: 'application/x-www-form-urlencoded; application/json',
    username: produsr,
    password: prodsec,
    data: jQuery.param(requestBody),
    success: function (){
      var data = {
        'result': true
      }
      return data;
    },
    statusCode: {
       400: function() {
         data = {
           'result': false,
           'error': 'invalid parameters supplied, do not submit with the same parameters';
         };
         return data;
       },
      401: function() {
        data = {
          'result': false,
          'error': 'permission denied, invalid http basic credentials';
        };
        return data;
      },
      404: function(result) {
        data = {
          'result': false,
          'error': 'user not found';
        };
        return data;
      },
      500: function(result) {
        data = {
          'result': false,
          'error': 'internal server error';
        };
      }
    }
  });
}
