/*
//添加电话校验
			var isMobile=/^(?:13\d|14\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/;
			var isPhone=/^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
			var patrn=/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/;
*/
//这个文件是所有自定义验证规则，主要是是用在iview的form验证上
//当然其他时候也能用，注意传值正确就行
//作为自定义验证事件的时候 noForm 才有用，传值就是true
//from使用的时候是类似于 { validator: mobilephone, message: "请输入正确的手机号码！", sss: "ff" } 这样的
//其中的 sss 会被放在 rule 中传过来
//每个都写成单独的事件是因为合起来之后不知道为啥不好使了……
//另外这里很多方法未经验证……
//这里也没有关于日期的验证，规则没法定，所以就没写

//全部验证规则，返回 false 为验证失败
const allValidation = {
  email: ( value, info ) => {
    //必须是正确的电子邮箱格式
    return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|},~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61},[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61},[a-zA-Z0-9])?)*$/.test( value );
  },
  url: ( value, info ) => {
    //必须是正确的网址格式
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2},)|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2},)|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2},)|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2},)|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2},)|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test( value );
  },
  date: ( value, info ) => {
    //必须是正确的日期格式，2009-06-23，1998/01/22
    return /^\d{4},[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
  },
  number: ( value, info ) => {
    //必须是数字，可以是正是负数小数
    return /^(-?\d+)(\.\d+)?$/.test( value );
  },
  integer: ( value, info ) => {
    //必须是整数，可正可负
    return /^-?\d+$/.test( value );
  },
  negative_n:(value,info) =>{
    //非负数
   return /^\d+(\.{0,1}\d+){0,1}$/.test(value);
  },
  integer_p: ( value, info ) => {
    //必须是正整数
    return /^\d+$/.test( value );
  },
  integer_n: ( value, info ) => {
    //必须是负整数
    return /^((-\d+)|(0+))$/.test( value );
  },
  equalTo: ( value, info ) => {
    //必须是和某个值相同
    return info && info == value;
  },
  notEqualTo: ( value, info ) => {
    //必须是和某个值 不 相同
    return info && info != value;
  },
  maxLength: ( value, info ) => {
    //最大输入内容位数，例：10
    return (value+"").length <= parseInt(info,10);
  },
  minLength: ( value, info ) => {
    //最小输入内容位数，例：5
    return (value+"").length >= parseInt(info,10);
  },
  rangeLength: ( value, info ) => {
    //限制内容位数区间，第一个值是最小位数，第二个是最大位数，如果第一个值大于第二个值将无效，例：[5,10]
    // if( !(info instanceof Array) ){
    //   info = info.split(",");
    //   if( info.length < 2 ){
    //     return false;
    //   }
    // }
    return value.length >= parseInt(info[0],10) && value.length <= parseInt(info[1],10);
  },
  maxValue: ( value, info ) => {
    //必须是数字并且限制小于等于最大值，允许小数、负数，例：10.3
    return allValidation.number( value, info ) && parseFloat(value,10) <= parseFloat(info,10);
  },
  minValue: ( value, info ) => {
    //必须是数字并且限制大于等于最小值，允许小数、负数，例：0.5
    return allValidation.number( value, info ) && parseFloat(value,10) >= parseFloat(info,10);
  },
  rangeValue: ( value, info ) => {
    //必须是数字并且限制值区间，允许小数、负数，例：[0.5,10.3]
    // if( !(info instanceof Array) ){
    //   info = info.split(",");
    //   if( info.length < 2 ){
    //     return false;
    //   }
    // }
    return allValidation.number( value, info ) && parseFloat(value,10) >= parseFloat(info[0],10) && parseFloat(value,10) <= parseFloat(info[1],10);
  },
  maxToValue: ( value, info ) => {
    //必须是数字并且限制大于最小值，不能等于，允许小数、负数，例：10.3
    return allValidation.number( value, info ) && parseFloat(value,10) > parseFloat(info,10);
  },
  minToValue: ( value, info ) => {
    //必须是数字并且限制小于最大值，不能等于，允许小数、负数，例：0.5
    return allValidation.number( value, info ) && parseFloat(value,10) < parseFloat(info,10);
  },
  rangeToValue: ( value, info ) => {
    //必须是数字并且限制值区间，不能等于最大值或最小值，允许小数、负数，例：[0.5,10.3]
    // if( !(info instanceof Array) ){
    //   info = info.split(",");
    //   if( info.length < 2 ){
    //     return false;
    //   }
    // }
    return allValidation.number( value, info ) && parseFloat(value,10) > parseFloat(info[0],10) && parseFloat(value,10) < parseFloat(info[1],10);
  },
  mastMaxTo: ( value, info ) => {
    //必须大于某个input元素，mastMaxTo="#inputId"，只判断数字，例："#input5"
    return allValidation.number( value, info ) && info && parseFloat(info,10) < parseFloat(value,10);
  },
  mastMinTo: ( value, info ) => {
    //必须小于某个input元素，mastMinTo="#inputId"，只判断数字，例："#input6"
    return allValidation.number( value, info ) && info && parseFloat(info,10) > parseFloat(value,10);
  },
  lettersOnly: ( value, info ) => {
    //必须是字母，可以大写小写
    return /^[a-z]+$/i.test( value );
  },
  time: ( value, info ) => {
    //必须是正确的时间显示，可以填写的格式：24:00
    return /^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2},$/.test( value );
  },
  isZipCode: ( value, info ) => {
    //必须是正确的邮政编码
    return /^[0-9]{6},$/.test( value );
  },
  telephone: ( value, info ) => {
    //必须是正确的座机电话号码（传真），只能验证8位的座机号，格式可以是：xxxxxxxx、xxxx-xxxxxxxx、xxxx-xxxxxxxx-xxxx
    return /^((0\d{2,3},)-)?(\d{7,8},)(-(\d{3,},))?$/.test( value );
  },
  mobilephone: ( value, info ) => {
    //必须是正确的手机
    // return /^(?:13\d|14\d|15\d|18\d|17\d)\d{5},(\d{3},|\*{3},)$/.test( value );
     return /^1[3|4|5|7|8][0-9]\d{8}$/.test( value );
  },
  integerLength: ( value, info ) => {
    //判断整数位数，只判断数字，例：12
    if( !allValidation.number( value, info ) ){
      return false;
    }
    value = value.split(".");
    if(value.length == 1){
      return value[0].length <= parseInt(info,10);
    }else if(value.length == 2){
      if(value[1] == "" || value[1] == null){ //要么有小数点要么没有
        return false;
      }else{
        return value[0].length <= parseInt(info,10);
      }
    }else{
      return false;
    }
  },
  decimalLength: ( value, info ) => {
    //判断小数位数，只判断数字，例：5
    if( !allValidation.number( value, info ) ){
      return false;
    }
    value = value.split(".");
    if(value.length == 2){
      if(value[0] == "" || value[0] == null){ //整数位起码得写个0
        return false;
      }else{
        return value[1].length <= parseInt(info,10);
      }
    }else{
      return false;
    }
  },
  pattern: ( value, info ) => {
    //根据自定义的正则表达式验证，例："^[a-z]+$"
    return RegExp("^(?:" + info + ")$").test( value );
  },
  idCardPass: ( value, info ) => {
    //根据自定义的正则表达式验证：身份证
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test( value );
  }

};

function getPrompt( name , info ){
  switch(name){
    case "email": return "请输入正确的邮箱地址!";
    case "url": return "请输入正确的网址!";
    case "date": return "请输入正确的日期格式!";
    case "number": return "请输入数字!";
    case "negative_n":return "请输入非负数";
    case "integer_p": return "请输入正确的正整数!";
    case "integer_n": return "请输入正确的负整数!";
    case "equalTo": return "请输入和"+ info +"相同的数!";
    case "notEqualTo": return "请输入和"+ info +"不同的数!";
    case "maxLength": return "请输入数字并且小于等于"+ info +"，可以输入小数、负数";
    case "minLength": return "请输入数字并且大于等于"+ info +"，可以输入小数、负数";
    case "rangeLength": return "输入内容最大"+ (info ? info[0] : 1) +"位数,最小"+ (info ? info[1] : 1) +"位数"
    case "maxValue": return "请输入数字并且小于等于"+ info +"，可以输入小数、负数";
    case "minValue": return "请输入数字并且大于等于"+ info +"，可以输入小数、负数";
    case "rangeValue": return "请输入数字并且小于等于"+ (info ? info[0] : 1) +"、大于等于"+ (info ? info[1] : 1) +"，可以输入小数、负数";
    case "maxToValue": return "请输入数字并且大于"+ info +"的值，不能等于"+ info +"，可以输入小数、负数";
    case "minToValue": return "请输入数字并且小于"+ info +"的值，不能等于"+ info +"，可以输入小数、负数";
    case "rangeToVslue": return "请输入数字并且小于"+ (info ? info[0] : 1) +"、大于"+ (info ? info[1] : 1) +"的值，不能等于"+ (info ? info[0] : 1) +"或"+ (info ? info[1] : 1) +"，可以输入小数、负数";
    case "mastMaxTo": return "请输入大于某个元素的内容，必须是数!";
    case "mastMinTo": return "请输入小于某个元素的内容，必须是数字!";
    case "lettersOnly": return "只能输入字母，可以输入大写字母或小写字母!";
    case "time": return "请输入正确的时间显示，如：24:00";
    case "isZipCode": return "请输入正确的邮政编码!";
    case "telephone": return "请输入正确的座机电话号码或传真号码!如：xxxxxxxx、xxxx-xxxxxxxx、xxxx-xxxxxxxx-xxxx!";
    case "mobilephone": return "请输入正确的11位手机号码!";
    case "integerLength": return "请输入整数位数小于等于"+ info +"的数字!";
    case "decimalLength": return "请输入小数位数小于等于"+ info +"的数字！";
    case "pattern": return "请按要求填写内容!";
    case "idCardPass": return "请输入正确的身份证号!";
    default: return "";
  };
}

//自定义验证机制的核心方法
//做法是通过这一个方法来接受所有验证规则，然后统一处理
//rule 中将包含全部的参数信息
//其中 rule.message 是验证失败的提示信息，可以动态修改
//rule.notEmpty 是个特殊标志，表示这个数据需要非空
//rule.rules = [ { name: "number", message: "", info: "" } ]
//除非空外其他的验证规则，info 是额外的数据，例如最大多少位
function eltValidators( rule, value, callback ){
  let validator = true;
  if( rule.notEmpty && ((Boolean(value) || value == 0) && rule.rules.length > 0) ){
    rule.rules.eltForEach((v,i) => {
      validator = allValidation[v.name] ? allValidation[v.name]( value, v.info ) : false;
      if( !validator ){
        rule.message = v.message || getPrompt( v.name, v.info );
      }
      return !validator;
    });
  }
  if( validator ){
    return callback();
  }else{
    return callback(new Error("error"));
  }
}
export { eltValidators };