function permute(arr) {
    if (arr.length === 1) {
        return [arr];
    }
    const permutations = [];
    for (let i = 0; i < arr.length; i++) {
        const remaining = arr.slice(0, i).concat(arr.slice(i + 1));

        const subPermutations = permute(remaining);

        for (const subPerm of subPermutations) {
            permutations.push([arr[i]].concat(subPerm));
        }
    }

    return permutations;
}
let result;
let array = [];
function chuanhoa(arr){
    let finalstring="";
    for(let i=0;i<arr.length;i++){
        finalstring+=arr[i]+" ";
    }
    return finalstring
}
function SinhHoanVi(){
    array=[];
    result=[];
    const inputString = document.getElementById("nhapn");
    const inputN = inputString.value.trim();
    const N = parseInt(inputN);
    let KQ="";
    for(let i=0;i<N;i++){
        array.push(i+1);
    }
    result = permute(array);
    console.log(result)
    for (let i = 0; i < result.length; i++) {
        KQ+="Hoán vị thứ "+(i+1)+": "+chuanhoa(result[i])+"<br>";
    }
    document.getElementById("KQSinh").innerHTML=KQ;
  
}