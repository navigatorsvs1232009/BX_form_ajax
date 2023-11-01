var Dreamsite = BX.namespace('Dreamsite');

Dreamsite.all = function () {

let timeWindowIsOpen = false;

BX.addCustomEvent("ontimemanwindowopen", function() {

console.log('ontimemanwindowopen');

});

BX.addCustomEvent("ontimemanwindowclose", function() {

console.log('ontimemanwindowclose');

});

}

  var procedureId;
  var elementName;

$(document).ready(function() {
  $('.otus_popup_window').on('click', function(event) {
  event.preventDefault();
              procedureId = $(this).data('procedure-id');
              elementName = $(this).data('element-name');
console.log(procedureId);
 var popup = BX.PopupWindowManager.create("popup-message", BX('element'), {
            content:
             '<input type="text" id="input1" name="input1" placeholder="ФИО клиента">' +
            '<input type="hidden" id="procid" name="procid" value="' + procedureId + '">' +
             '<br><br><input type="datetime-local" id="input2" name="input2" placeholder="Время записи" >' +
             '<input type="hidden" id="input3" name="input3" value="' + elementName + '">',
            width: 400, // ширина окна
            height: 250, // высота окна
            zIndex: 100, // z-index
            closeIcon: {
                opacity: 1
            },
            titleBar: 'Заголовок окна',
            closeByEsc: true, // закрытие окна по escЙ
            darkMode: false, // окно будет светлым или темным
            autoHide: false, // закрытие при клике вне окна
            draggable: true, // можно двигать или нет
            resizable: true, // можно ресайзить
            min_height: 250, // минимальная высота окна
            min_width: 100, // минимальная ширина окна
            lightShadow: true, // использовать светлую тень у окна
            angle: true, // появится уголок
            overlay: {
                backgroundColor: 'black',
                opacity: 500
            },
            buttons: [
                new BX.PopupWindowButton({
                    text: 'Записать', // текст кнопки
                    id: 'save-btn', // идентификатор
                    className: 'ui-btn ui-btn-success', // доп. классы
                    events: {
                      click: function() {
                        var inpone=$("#input1").val();
                        var inptwo=$("#input2").val();
                        var procedureId = $("#procid").val();
                        var elementName = $("#input3").val();
                        BX.ajax({
                          url: '/ajaxtest/ajax.php',
                          method: 'POST',
                          dataType: 'json',
                          data: {
                           inp1: inpone,
                           inp2: inptwo,
                           procedureId: procedureId,
                            elementName: elementName
                          },
                          onsuccess: function(data) {
                            console.log(data);
                            $(location).prop('href', 'http://192.168.0.107/services/lists/18/view/0/?list_section_id=')
                          },
                          onfailure: function() {
                          }
                        });
                      }
                    }
                }),
                new BX.PopupWindowButton({
                    text: 'Закрыть',
                    id: 'copy-btn',
                    className: 'ui-btn ui-btn-primary',
                    events: {
                      click: function() {
                      popup.close();
                      }
                    }
                })
            ],
                events: {
                    onPopupShow: function () {
              "Procedure ID: " + procedureId,
              ", Врач: " + elementName

                    },
                    onPopupClose: function () {
            $("#procid").val("");
                    }
                }
            });
        popup.show();
  });
});
