var Pd;
let pInput = true;
let lambda_iter;
var a_Values = [];//[0.004,0.006,0.009];
var b_Values = [];//[5.3,5.5,5.8];
var c_Values = [];//[500,400,200];
var pmin_Values = [];
var pmax_Values = [];
let resultPowersIter = [];
let resultCostsIter = [];
let finalLinePlotData=[];
let TimeOut = 5000;
let checkBoxStatus=false;
let islimit = false;
document.getElementById('limitEnable').style.display = 'block';

// Debug-below function for testing lambda value
// function preSetExample(e){
//     switch(e){
//         case 1:
//             a_Values = [0.004,0.006,0.009];
//             b_Values = [5.3,5.5,5.8];
//             c_Values = [500,400,200];
//             Pd = 800;
//             break;
//         case 2:
//             a_Values = [0.0025,0.0081,0.0025];
//             b_Values = [8.4,6.3,7.5];
//             c_Values = [225,729,400];
//             pmin_Values = [45,45,47.5];
//             pmax_Values = [350,350,450];
//             Pd = 900;
//             break;
//         case 3:
//             a_Values = [0.004,0.006,0.009];
//             b_Values = [5.3,5.5,5.8];
//             c_Values = [500,400,200];
//             pmin_Values = [200,150,100];
//             pmax_Values = [450,350,225];
//             Pd = 975;
//             break;
// }
//     displayEntry();
// }


function addEntry(){
    a_Values.push(Number(document.getElementById('a').value));
    b_Values.push(Number(document.getElementById('b').value));
    c_Values.push(Number(document.getElementById('c').value));
    
    //checkBoxStatus = document.getElementById('limitEnable').ariaChecked;
    if(checkBoxStatus){
    pmin_Values.push(Number(document.getElementById('Pmin').value));
    pmax_Values.push(Number(document.getElementById('Pmax').value));
    }
    else{
        pmin_Values.push('-');
        pmax_Values.push('-');
    }
    document.getElementById('a').value = '';
    document.getElementById('b').value = '';
    document.getElementById('c').value = '';
    document.getElementById('Pmin').value = '';
    document.getElementById('Pmax').value = '';
    displayEntry();
}

function displayEntry(){
    let entriesHeading = '<thead class="thead-dark"><tr><th>Generator</th><th>a</th><th>b</th><th>c</th><th>Pmin</th><th>Pmax</th><th></th><th></th></tr></thead>';
    let entryData = '<tbody>';
    for(let i=0;i<a_Values.length; i++){
        entryData += '<tr><td>'+`G${i+1}`+`</td><td id="a-${i}">`+a_Values[i]+`</td><td id="b-${i}">`+b_Values[i]+`</td><td id="c-${i}">`+c_Values[i]+`</td><td id="pmin-${i}">`+pmin_Values[i]+`</td><td id="pmax-${i}">`+pmax_Values[i]+'</td><td>'+'<button type="button" class="btn btn-primary btn-sm far" id="editButton-'+i+'" onclick=editEntry('+ i +')>&#xf044;</button>'+'<button type="button" class="btn btn-primary btn-sm far" style ="display: none;" id="saveButton-'+i+'" onclick=saveEntry('+ i +')>&#xf0c7;</button>'+'</td><td>'+'<button type="button" class="btn btn-danger btn-sm far" onclick=delEntry('+ i +')>&#xf2ed</button></td></tr>';  
    }
    entryData += '</tbody>'
    document.getElementById('EntryTable').innerHTML = entriesHeading + entryData;
}

function delEntry(entryNo){
    if(entryNo!=-1){
        a_Values.splice(entryNo,1);
        b_Values.splice(entryNo,1);
        c_Values.splice(entryNo,1);
        pmin_Values.splice(entryNo,1);
        pmax_Values.splice(entryNo,1);
    }
    else{
        a_Values = []
        b_Values = []
        c_Values = []
        pmin_Values = []
        pmax_Values = []
    }   
    displayEntry();
}

function editEntry(entryNo){
    
    document.getElementById('editButton-'+entryNo).style.display = 'none';
    document.getElementById('saveButton-'+entryNo).style.display = 'block';
    let a = document.getElementById('a-'+entryNo); 
    let b = document.getElementById('b-'+entryNo); 
    let c = document.getElementById('c-'+entryNo); 
    let pmin = document.getElementById('pmin-'+entryNo); 
    let pmax = document.getElementById('pmax-'+entryNo); 

    let a_value = a.innerHTML; 
    let b_value = b.innerHTML; 
    let c_value = c.innerHTML; 
    let pmin_value = pmin.innerHTML; 
    let pmax_value = pmax.innerHTML;  

    a.innerHTML = `<input id = "a_edit-${entryNo}" type="number" class="form-control" value="${a_value}" ></input>`;
    b.innerHTML = `<input id = "b_edit-${entryNo}" type="number" class="form-control" value="${b_value}" ></input>`;
    c.innerHTML = `<input id = "c_edit-${entryNo}" type="number" class="form-control" value="${c_value}" ></input>`;
    if(pmin_Values[entryNo]=='-')
        return;
    pmin.innerHTML = `<input id = "pmin_edit-${entryNo}" type="number" class="form-control" value="${pmin_value}" ></input>`;
    pmax.innerHTML = `<input id = "pmax_edit-${entryNo}" type="number" class="form-control" value="${pmax_value}" ></input>`;
    

}

function saveEntry(entryNo){

    document.getElementById('editButton-'+entryNo).style.display = 'block';
    document.getElementById('saveButton-'+entryNo).style.display = 'none';

    let a_value = document.getElementById('a_edit-'+entryNo).value; 
    let b_value = document.getElementById('b_edit-'+entryNo).value; 
    let c_value = document.getElementById('c_edit-'+entryNo).value; 
    
    

    let a = document.getElementById('a-'+entryNo); 
    let b = document.getElementById('b-'+entryNo); 
    let c = document.getElementById('c-'+entryNo); 
     
    
    a_Values[entryNo] = a.innerHTML = Number(a_value);
    b_Values[entryNo] = b.innerHTML = Number(b_value);
    c_Values[entryNo] = c.innerHTML = Number(c_value);
    let pmin_value;
    let pmax_value;
    let pmin;
    let pmax;
    if(pmin_Values[entryNo]!='-'){
    pmin_value = document.getElementById('pmin_edit-'+entryNo).value; 
    pmax_value = document.getElementById('pmax_edit-'+entryNo).value;
    pmin = document.getElementById('pmin-'+entryNo); 
    pmax = document.getElementById('pmax-'+entryNo);
    pmin_Values[entryNo] = pmin.innerHTML = Number(pmin_value);
    pmax_Values[entryNo] = pmax.innerHTML = Number(pmax_value);
    }     
}

function compute(){
    let result_div = document.getElementById("result");
    
    Pd = document.getElementById('powerDemand').value;
    // preSetExample(3);
    if(a_Values.length==0||Pd==''){
        alert('MISSING INPUT!');
        result_div.style.display = 'none';
        return;
    } 
    // To-do
    // islimit as of now is hard-coded to false (no Plimits).
    result_div.style.display = 'block';
    
    // To-do
    finalLinePlotData=[]; //clear previous input data if Compute is pressed more than once in 
                          //in the same session (without reload).
    addCostEquations();
    if(pmax_Values.length>=1 && Number(pmax_Values[0]))
        islimit = true;
    else 
        islimit = false;
    calcApproachIterative(islimit); //for iter. approach method;
    displayLambda();
    plotIncrementalCost(); //calling after computation for plotting the lambda line
    displayPd();
    drawResultTable(tableID="resultTableIter");
    plotPieChart(divIDs = ["pieChartPowerIter","pieChartCostIter"]);

    
    // printValues();
    
}

function checkBoxUpdate(){
    checkBoxStatus = !checkBoxStatus;
    //checkBoxStatus = document.getElementById('limitEnable').checked;
    if(checkBoxStatus){
        document.getElementById('Pmin').disabled=false;
        document.getElementById('Pmax').disabled=false;
    }
    else {
        document.getElementById('Pmin').value = '';
        document.getElementById('Pmax').value = '';
        document.getElementById('Pmin').disabled=true;
        document.getElementById('Pmax').disabled=true;
    }
}

// Debug-Function to test values of inputs
function printValues(){
    console.clear();
    console.log(a_Values);
    console.log(b_Values);
    console.log(c_Values);
    console.log(pmin_Values);
    console.log(pmax_Values);
    console.log('PowerDemand: '+Pd);
    console.log(`Lambda: ${lambda_iter}`);
    console.log(resultPowersIter);
    console.log(resultCostsIter);
    
}

function plotIncrementalCost(){    
      
      // dC/dP = 2*a*P + b;
      
      let px = [0,Pd];
      for(let i=0;i<a_Values.length;i++){
        let trace = {
            x: [0,Pd],
            y: [b_Values[i], 2*a_Values[i]*Pd+b_Values[i]],
            mode: 'lines',
            name: `G${i+1}`
          };
         finalLinePlotData.push(trace); 
      }
      let linePlotLayout = {
        height: 400,
        width: 500,
        title:'Incremental Cost Curves',
        xaxis: {
        title: 'P (MW) →'
        },
        yaxis: {
        title: 'dC/dP (₹/MWh) →'
        }
      }
      Plotly.newPlot('incrementalCostPlot',finalLinePlotData,linePlotLayout);
}

function plotPieChart(divIDs){

    //IIFE
    let resultP,resultC;
    
    resultP = resultPowersIter;
    resultC = resultCostsIter;
    
    let generatorLabels = ((size)=>{
        let arr = [];
        for(let i=0;i<size;i++)
            arr.push(`G${i+1}`);
            return arr;
    })(a_Values.length);

    let data_power = [{
        values: resultP,
        labels: generatorLabels,
        type: 'pie'
      }];
      
    let layout_power = {
        height: 400,
        width: 500,
        title: 'Power Split %'
      };

      let data_cost = [{
        values: resultC,
        labels: generatorLabels,
        type: 'pie'
      }];
      
    let layout_cost = {
        height: 400,
        width: 500,
        title: 'Cost Split %'
      };

      Plotly.newPlot(divIDs[0], data_power, layout_power);    
      Plotly.newPlot(divIDs[1], data_cost, layout_cost);  

}

function drawResultTable(tableID){
    let resultTableHead = '<table class="table"><thead class="thead-dark">'
    resultTableHead += '<tr><th>Generator</th><th>Power (MW)</th><th>Cost (₹/h)</th></thead></tr>'
    let resultTableBody = '<tbody>';
    let resultP,resultC;
    
    resultP = resultPowersIter;
    resultC = resultCostsIter;
    
    

    let sumPower = Math.round(resultP.reduce((a,b)=>a+b,0));
    let sumCost = resultC.reduce((a,b)=>a+b,0).toFixed(3);
    for(let i=0;i<resultP.length;i++)
        resultTableBody += `<tr><th>G${i+1}</th><td>${resultP[i].toFixed(3)}</td><td>${resultC[i].toFixed(2)}</td></tr>`;
    resultTableBody += `<tr><th>Total</th><th>${sumPower}</th><th>${sumCost}</th></tr>`;  
    resultTableBody += '</tbody></table>';
    document.getElementById(tableID).innerHTML = resultTableHead+resultTableBody;
}

function calcApproachIterative(islimit){
    // lambda_iter = Math.max(...b_Values);
    initialLambda(); //set Initial Value of Lambda
    let D = Pd;
    let dP = D;
    let sumP;
    let date = new Date();
    startTime = date.getTime();
    console.log('islimit value inside calcIter(): ',islimit);
    pmax_Values.forEach((ele, index, arr)=>{if(Number.isNaN(arr[index])||arr[index]=='-') arr[index]=Number.POSITIVE_INFINITY;})
    pmin_Values.forEach((ele, index, arr)=>{if(Number.isNaN(arr[index])||arr[index]=='-') arr[index]=0;})  
    console.log(pmax_Values);
    console.log(pmin_Values);
    while(Math.abs(dP)>0.001){
        let end = new Date().getTime();
        if(end-startTime>TimeOut)
            {
                alert('Enter Valid Input');
                reload();
                return;
            }
        resultPowersIter = b_Values.map((b,i)=>{return (lambda_iter-b)/(2*a_Values[i])});

              
            
        resultPowersIter = resultPowersIter.map((P,i)=> {return Math.min(P,pmax_Values[i])});
        resultPowersIter = resultPowersIter.map((P,i)=> {return Math.max(P,pmin_Values[i])});
            
        sumP = resultPowersIter.reduce((a,b)=>{return a+b},0);
        dP = D-sumP;
        lambda_iter += (2*dP)/(a_Values.map((a)=>{return (1/a)}).reduce((a,b)=>a+b,0));
    }
    resultCostsIter = resultPowersIter.map((P,i)=>{return a_Values[i]*P*P+b_Values[i]*P+c_Values[i]});
    // console.log(resultPowersIter);
    addLambdaLine();
}

function initialLambda(){
    // lambda = (Pd + sum(b/(2*a)))/(sum(1/2*a))
    // sum(b/(2*a)) ==> numerator_1
    // sum(1/2*a) ==> denominator_1
    // refLink = http://www.ee.unlv.edu/~eebag/Economic%20%20Dispatch.pdf Page-6

    let numerator_1 = a_Values.map((a,i) =>{return (b_Values[i]/(2*a))}).reduce((a,b)=>a+b,0);
    let denominator_1 = a_Values.map((a) =>{return (1/(2*a))}).reduce((a,b)=>a+b,0);

    lambda_iter = (numerator_1+Pd)/(denominator_1);
}

function addLambdaLine(){
    finalLinePlotData.push({
        x: [0,Pd],
        y: [lambda_iter,lambda_iter],
        mode: 'lines',
        name: `λ`,
        line:{
            dash:'dot',
            width:4
        }
    });
}

function addCostEquations(){
    let eqTableHead = '<table class="table"><thead class="thead-dark">'
    eqTableHead += '<tr><th>Generator</th><th>Cost Function (₹/h)</th><th>Incremental Cost Function (₹/MWh)</th></tr></thead>'
    let eqTableBody = '<tbody>';

    for(let i=0;i<a_Values.length;i++)
        eqTableBody += `<tr><th>G${i+1}</th><td>${a_Values[i]}<b>P<sup>2</sup></b> + ${b_Values[i]}<b>P</b> + ${c_Values[i]}</td><td>${2*a_Values[i]}<b>P</b> + ${b_Values[i]}</td></tr>`;
    eqTableBody += '</tbody></table>';
    document.getElementById('costEquations').innerHTML = eqTableHead+eqTableBody;
}

function displayPd(){
    document.getElementById("Pd").innerHTML = `P<sub>D</sub> = ${Pd} MW`;
}

function displayLambda(){
    document.getElementById('lambda').innerHTML = `&lambda; = ${lambda_iter.toFixed(3)} ₹/MWh`;
}

function readInputFile(){
    pInput = false;
    
    let upload = document.getElementById('inputFile');
    let data;

    if (window.File && window.FileReader && window.FileList && window.Blob) {
           let f = new FileReader();
           f.readAsText(upload.files[0]);
           f.onload = ()=>{
               data = f.result.split('\r\n');
               console.log("Uploaded Data: ",data);
               updateData(data);
           }
           
        
     } else {
        alert("Your browser is too old to support HTML5 File API");
     }   
}

function updateData(data){
    a_Values = [];
    b_Values = [];
    c_Values = [];
    pmin_Values = [];
    pmax_Values = [];
    Pd = Number(data[0]);
    document.getElementById('powerDemand').value = Pd;
    for(let i=1;i<data.length;i++){
        let g_DataOfi = data[i].split(' ');
        a_Values.push(Number(g_DataOfi[0]));
        b_Values.push(Number(g_DataOfi[1]));
        c_Values.push(Number(g_DataOfi[2]));
        if(g_DataOfi.length>=3){
         pmin_Values.push(Number(g_DataOfi[3]));
         pmax_Values.push(Number(g_DataOfi[4]));
        } 
                        
    }
    console.log(Pd);
    console.log(a_Values);
    console.log(b_Values);
    console.log(c_Values);
    console.log(pmin_Values);
    console.log(pmax_Values);
    displayEntry(); 
}

function reload(){
    window.location = '/';
}