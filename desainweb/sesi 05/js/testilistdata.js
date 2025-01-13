var NIM = "2401010714"
var urlAPI = "https://apimhstiki.ptov.my.id/"
var urlLIST = urlAPI+"/testi-"+NIM+"/read"
var urlDEL = `${urlAPI}/testi`

$("#infsukses").hide()
$("#infgagal").hide()

$(function(){
    listdata()
})

function listdata(){
    $.ajax({
        url: urlLIST,
        method: 'GET',
        DataType: 'json',
        success: function(dta){
            let tbl = ""
            let idx = 0
            if(dta.error == 4){
                dta.TESTI.forEach(function(isi){
                    tbl += `<tr>
                    <td>${isi.NAMA}</td>
                    <td>${isi.EMAIL}</td>
                    <td>${isi.TESTI}</td>
                    <td>${isi.IPX}</td>
                    <td><a onclick="destroy('${idx}')" class="btn btn-danger btn-sm"> Hapus </a></td>
                  </tr>`
                })
                $("tbody").html(tbl)
            }
        },
        error:function(){
            console.log("Gagal mengambil Data Testimoni")
        }
    })
}
function destroy(idx){
    $.ajax({
        url: urlDEL,
        method: 'POST',
        data: 'ACT=destroy&NIM='+NIM+'&IDX='+idx,
        dataType: 'json',
        success: function(dta){
            console.log(dta)
            if(dta.error == 0 ){
                $("#infsukses").show()
                $("#infsukses").html("Data Testimoni berhasil di hapus")
            }else{
                $("#infgagal").show()
            }
            setTimeout(function(){
                window.location.reload(1)
            },3000)
        },
        error: function(){
            console.log("Terjadi masalah saat hapus data")
        }

    })
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
    }

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Nice, you triggered this alert message!', 'success')
  })
}