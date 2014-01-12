/**
* @function serializeFieldset
* @description Serialize a group of fields.
* @autor diggramirez
* @url https://github.com/diggramirez/serializeFieldset
* @version 0.1 beta
* @example
*  $('fieldset:eq(0)').serializeFieldset();
*  => {"email1":"abc@abc.com","email2":"def@def.com"}
*/
$.fn.serializeFieldset = function()
{
 var object = {};
 var me = $(this);
 var a = me.serializeArray();

 $.each(a, function(i) {
  name = this.name.split('[').join('.').replace(/]/g, '');
  keys = name.split('.');
  if(i===0&&keys[0]==='')
    object = [];
  object = add_to_obj(object,keys,this.value);
});

 var first;
 function add_to_obj (list, keys, value) {
  var key = keys[0];

  if(keys.length==0)
    return value;
  keys.shift();
  if (key) {
    if (!list[key])
      list[key] = keys[0]===''||!isNaN(keys[0])?[]:{};

    list[key] = add_to_obj(list[key],keys, value);
  } 
  else if (key==='')
  {
    if(first&&first!==keys[0])
      list[list.length-1] = add_to_obj(list[list.length-1],keys, value);
    else
    {
      first=keys[0];
      list.push(add_to_obj(keys[0]===''?[]:{},keys, value));
    }
  }
  return list;
}

return object;
};
