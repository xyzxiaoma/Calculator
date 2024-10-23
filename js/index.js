

//获取fText
var fText = document.getElementById("fText");

//定义变量
var nums_1 = [],nums_2 = [],nums = [0,nums_1,nums_2],operation = null;
var indexs = [0,0,0],operation_flag = false,point_flags = [false,false,false];
var over_flag = false;

function handleButtonClick(value,type) {
    if(type == "number"){
        if(over_flag){
            fText.innerHTML = "";
            over_flag = false;
        }
        //判断是否是第一个数
        if(!operation_flag)
            addNumber(value,1);
        else
            addNumber(value,2);
    }
    else{
        switch(value){
            case "c":
                Opration_C()
                break;
            case "back":
                Operation_back();
                break;
            case "+":
                Operation(value);
                break;
            case "-":
                Operation(value);
                break;
            case "*":
                Operation(value);
                break;
            case "/":
                Operation(value);
                break;
            case "%":
                Operation(value);
                break;
            case "=":
                Operation_Calculate();
                break;
        }
    }
    
}

function Operation_Calculate(){
    if(operation_flag == false) return ;
    if(operation == "+"){
        //打印数据
        fText.innerHTML = add(nums_1,nums_2);
        //清空数字
        Empty();
    }
    else if(operation == "-"){
        //打印数据
        fText.innerHTML = subtract(nums_1,nums_2);
        //清空数字
        Empty();
    }
    else if(operation == "*"){
        //打印数据
        fText.innerHTML = multiply(nums_1,nums_2);
        console.log("111111111");
        //清空数字
        Empty();
    }
    else if(operation == "/"){
        //打印数据
        fText.innerHTML = divide(nums_1,nums_2);
        //清空数字
        Empty();
    }
    else if(operation == "%"){
        //打印数据
        fText.innerHTML = remainder(nums_1,nums_2);
        //清空数字
        Empty();
    }
    
}

function Empty(){
    //清空所有数据
    nums_1 = [];
    nums_2 = [];
    operation = null;
    nums = [0,nums_1,nums_2];
    indexs = [0,0,0];
    operation_flag = false;
    point_flags = [false,false,false];
    over_flag = true;
}

const convertArrayToNumber = (arr) => {
return parseFloat(arr.join(''));
};

const add = (arr1, arr2) => {
    return convertArrayToNumber(arr1) + convertArrayToNumber(arr2);
};

const subtract = (arr1, arr2) => {
    return convertArrayToNumber(arr1) - convertArrayToNumber(arr2);
};

const multiply = (arr1, arr2) => {
    return convertArrayToNumber(arr1) * convertArrayToNumber(arr2);
};

const divide = (arr1, arr2) => {
    return convertArrayToNumber(arr1) / convertArrayToNumber(arr2);
};

const remainder = (arr1,arr2) =>{
    return convertArrayToNumber(arr1) % convertArrayToNumber(arr2);
}

function Operation(value){
    if(operation_flag) return ;
    operation = value;
    operation_flag = true;
    fText.innerHTML += value;
}

function Operation_back(){
    //判断是第几个数
    if(operation_flag == false) 
        back_number(1);
    else 
        back_number(2);
}

function back_number(index){
    if(indexs[index] == 0) return ;
    indexs[index] --;
    if(nums[index][indexs[index]] == "."){
        point_flags[index] = false;
    }
    nums[index].pop();
    //页面中删除
    fText.innerHTML = fText.innerHTML.substring(0,fText.innerHTML.length - 1);
    printf(index);

}

function Opration_C(){
    //清空所有数据
    nums_1 = [];
    nums_2 = [];
    operation = null;
    nums = [0,nums_1,nums_2];
    indexs = [0,0,0];
    operation_flag = false;
    point_flags = [false,false,false];
    fText.innerHTML = "";
}

function printf(index){
    console.log(nums[index].join(''));
    
}

function addNumber(value,index){
    //判断是不是小数点
    if(value == '.'){
        //如果已经有小数点了，则不处理
        if(point_flags[index]) return ; 
        else{
            //判断是不是第一个数
            if(indexs[index] == 0) return ;
            point_flags[index] = true;
            nums[index][indexs[index]] = value;
            indexs[index] ++;
            fText.innerHTML += value;
            printf(index);
            return;
        }
    }
    //判断是小数点前还是后
    if(!point_flags[index]){
        //如果是第一个数，则判断是不是0或者00,则不处理
        if(indexs[index] == 0 && (value == "0" || value == "00")) return ;
        //如果不是第一个数，则判断是不是00,
        if(indexs[index] != 0 && value == "00"){
            nums[index][indexs[index]] = 0;
            indexs[index] ++;
            nums[index][indexs[index]] = 0;
            indexs[index] ++;
            fText.innerHTML += value;
            printf(index);
            return ;
        }
        //加数
        nums[index][indexs[index]] = value;
        indexs[index] ++;
        fText.innerHTML += value;
        printf(index);
    }
    else{
        //判断是不是00
        if(indexs[index] != 0 && value == "00"){
            nums[index][indexs[index]] = 0;
            indexs[index] ++;
            nums[index][indexs[index]] = 0;
            indexs[index] ++;
            fText.innerHTML += value;
            printf(index);
            return ;
        }
        //加数
        nums[index][indexs[index]] = value;
        indexs[index] ++;
        fText.innerHTML += value;
        printf(index);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll("#calculator input[type='button']");
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            handleButtonClick(button.value, button.getAttribute("data-type"));
        });
    });
});