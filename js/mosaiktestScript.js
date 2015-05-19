/* 
 * This script contains the interaction and flow logic of the tast: Mosaiktest
 */



var willCorrect = false;
var canForwardToNext = false;

var picSelectedTask1 = false;
var canDeleteTask1 = false;
var readyToDeletePicIdTask1 = null;
var selectedPicIdTask1 = null;

var picSelectedTask2 = false;
var canDeleteTask2 = false;
var readyToDeletePicIdTask2 = null;
var selectedPicIdTask2 = null;

var picSelectedTask3 = false;
var canDeleteTask3 = false;
var readyToDeletePicIdTask3 = null;
var selectedPicIdTask3 = null;

var picSelectedTask4 = false;
var canDeleteTask4 = false;
var readyToDeletePicIdTask4 = null;
var selectedPicIdTask4 = null;

var picSelectedTask5 = false;
var canDeleteTask5 = false;
var readyToDeletePicIdTask5 = null;
var selectedPicIdTask5 = null;

var picSelectedTask6 = false;
var canDeleteTask6 = false;
var readyToDeletePicIdTask6 = null;
var selectedPicIdTask6 = null;

var picSelectedTask7 = false;
var canDeleteTask7 = false;
var readyToDeletePicIdTask7 = null;
var selectedPicIdTask7 = null;

var picSelectedTask8 = false;
var canDeleteTask8 = false;
var readyToDeletePicIdTask8 = null;
var selectedPicIdTask8 = null;

var picSelectedTask9 = false;
var canDeleteTask9 = false;
var readyToDeletePicIdTask9 = null;
var selectedPicIdTask9 = null;

var picSelectedTask10 = false;
var canDeleteTask10 = false;
var readyToDeletePicIdTask10 = null;
var selectedPicIdTask10 = null;

var picSelectedTask11 = false;
var canDeleteTask11 = false;
var readyToDeletePicIdTask11 = null;
var selectedPicIdTask11 = null;

var picSelectedTask12 = false;
var canDeleteTask12 = false;
var readyToDeletePicIdTask12 = null;
var selectedPicIdTask12 = null;

var picSelectedTask13 = false;
var canDeleteTask13 = false;
var readyToDeletePicIdTask13 = null;
var selectedPicIdTask13 = null;

var picSelectedTask14 = false;
var canDeleteTask14 = false;
var readyToDeletePicIdTask14 = null;
var selectedPicIdTask14 = null;

var picSelectedTask15 = false;
var canDeleteTask15 = false;
var readyToDeletePicIdTask15 = null;
var selectedPicIdTask15 = null;


var selectBeforeDeleteHint = "Sie müssen zuerst eine Figur rechts auswählen!";
var fillBeforeContinueHint = "Füllen Sie bitte vorher alle Felder mit den Figuren oben!";
var infoDivDelay = 1000;



function onShowDemo() {
    try
    {
        $.mobile.changePage('#mosaiktestDemo1', {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function onShowActiveDemo() {
    try
    {
        $.mobile.changePage('#mosaiktestDemo4', {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}



function switchToFollowingPage(nextPage)
{

    try
    {
        setTimeout(function () {

            $.mobile.changePage('#' + nextPage, {transition: "flip"});

        }, 1000);
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}



//task 1


function selectImageTask1(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask1(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask1 = true;
                selectedPicIdTask1 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask1 = false;
                selectedPicIdTask1 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask1(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask1;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask1 && isEmpty)
        {
            // reset status
            picSelectedTask1 = false;
            canDeleteTask1 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask1 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask1).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask1).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask1 = clickedFieldId;
                readyToDeletePicIdTask1 = clickedFieldId;
                canDeleteTask1 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask1 = null;
                willCorrect = false;
                canDeleteTask1 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 2) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask1() {

    try
    {
        if (canDeleteTask1 && readyToDeletePicIdTask1 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask1).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask1).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask1 = null;
            canDeleteTask1 = false;
        }

        else
        {

            $("#infoDivTask1").html(selectBeforeDeleteHint);
            $("#infoDivTask1").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask1").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function switchToTask2() {

    try
    {
        if (canForwardToNext) {

            setTimeout(function () {

                $.mobile.changePage('#task2', {transition: "flip"});

            }, 500);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask1").html(fillBeforeContinueHint);
            $("#infoDivTask1").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask1").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


//! task1




//task 2


function selectImageTask2(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask2(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask2 = true;
                selectedPicIdTask2 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask2 = false;
                selectedPicIdTask2 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask2(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask2;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask2 && isEmpty)
        {
            // reset status
            picSelectedTask2 = false;
            canDeleteTask2 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask2 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask2).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask2).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask2 = clickedFieldId;
                readyToDeletePicIdTask2 = clickedFieldId;
                canDeleteTask2 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask2 = null;
                willCorrect = false;
                canDeleteTask2 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 2) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask2() {

    try
    {
        if (canDeleteTask2 && readyToDeletePicIdTask2 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask2).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask2).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask2 = null;
            canDeleteTask2 = false;
        }

        else
        {

            $("#infoDivTask2").html(selectBeforeDeleteHint);
            $("#infoDivTask2").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask2").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function switchToTask3() {

    try
    {
        if (canForwardToNext) {
            
            // show gained bricks page
            $.mobile.changePage('#got2BricksPage', {transition: "flip"});

            setTimeout(function () {

                $.mobile.changePage('#task3', {transition: "flip"});

            }, 1000);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask2").html(fillBeforeContinueHint);
            $("#infoDivTask2").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask2").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


//! task2



//task 3


function selectImageTask3(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask3(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask3 = true;
                selectedPicIdTask3 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask3 = false;
                selectedPicIdTask3 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask3(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask3;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask3 && isEmpty)
        {
            // reset status
            picSelectedTask3 = false;
            canDeleteTask3 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask3 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask3).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask3).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask3 = clickedFieldId;
                readyToDeletePicIdTask3 = clickedFieldId;
                canDeleteTask3 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask3 = null;
                willCorrect = false;
                canDeleteTask3 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 2) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask3() {

    try
    {
        if (canDeleteTask3 && readyToDeletePicIdTask3 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask3).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask3).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask3 = null;
            canDeleteTask3 = false;
        }

        else
        {

            $("#infoDivTask3").html(selectBeforeDeleteHint);
            $("#infoDivTask3").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask3").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function switchToTask4() {

    try
    {
        if (canForwardToNext) {

            setTimeout(function () {

                $.mobile.changePage('#task4', {transition: "flip"});

            }, 500);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask3").html(fillBeforeContinueHint);
            $("#infoDivTask3").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask3").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


//! task3



//task 4


function selectImageTask4(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask4(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask4 = true;
                selectedPicIdTask4 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask4 = false;
                selectedPicIdTask4 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask4(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask4;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask4 && isEmpty)
        {
            // reset status
            picSelectedTask4 = false;
            canDeleteTask4 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask4 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask4).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask4).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask4 = clickedFieldId;
                readyToDeletePicIdTask4 = clickedFieldId;
                canDeleteTask4 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask4 = null;
                willCorrect = false;
                canDeleteTask4 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 2) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask4() {

    try
    {
        if (canDeleteTask4 && readyToDeletePicIdTask4 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask4).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask4).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask4 = null;
            canDeleteTask4 = false;
        }

        else
        {

            $("#infoDivTask4").html(selectBeforeDeleteHint);
            $("#infoDivTask4").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask4").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function switchToTask5() {

    try
    {
        if (canForwardToNext) {

            setTimeout(function () {

                $.mobile.changePage('#task5', {transition: "flip"});

            }, 500);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask4").html(fillBeforeContinueHint);
            $("#infoDivTask4").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask4").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


//! task4




//task 5


function selectImageTask5(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask5(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask5 = true;
                selectedPicIdTask5 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask5 = false;
                selectedPicIdTask5 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask5(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask5;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask5 && isEmpty)
        {
            // reset status
            picSelectedTask5 = false;
            canDeleteTask5 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask5 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask5).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask5).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask5 = clickedFieldId;
                readyToDeletePicIdTask5 = clickedFieldId;
                canDeleteTask5 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask5 = null;
                willCorrect = false;
                canDeleteTask5 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 4) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask5() {

    try
    {
        if (canDeleteTask5 && readyToDeletePicIdTask5 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask5).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask5).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask5 = null;
            canDeleteTask5 = false;
        }

        else
        {

            $("#infoDivTask5").html(selectBeforeDeleteHint);
            $("#infoDivTask5").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask5").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function switchToTask6() {

    try
    {
        if (canForwardToNext) {
            
            
            setTimeout(function () {

                $.mobile.changePage('#task6', {transition: "flip"});

            }, 1000);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask5").html(fillBeforeContinueHint);
            $("#infoDivTask5").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask5").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}



//! task5



//task 6


function selectImageTask6(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask6(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask6 = true;
                selectedPicIdTask6 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask6 = false;
                selectedPicIdTask6 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask6(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask6;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask6 && isEmpty)
        {
            // reset status
            picSelectedTask6 = false;
            canDeleteTask6 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask6 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask6).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask6).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask6 = clickedFieldId;
                readyToDeletePicIdTask6 = clickedFieldId;
                canDeleteTask6 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask6 = null;
                willCorrect = false;
                canDeleteTask6 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 4) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask6() {

    try
    {
        if (canDeleteTask6 && readyToDeletePicIdTask6 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask6).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask6).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask6 = null;
            canDeleteTask6 = false;
        }

        else
        {

            $("#infoDivTask6").html(selectBeforeDeleteHint);
            $("#infoDivTask6").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask6").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function switchToTask7() {

    try
    {
        if (canForwardToNext) {
            
            // show gained bricks page
            $.mobile.changePage('#got4BricksPage', {transition: "flip"});
            
            setTimeout(function () {

                $.mobile.changePage('#task7', {transition: "flip"});

            }, 1000);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask6").html(fillBeforeContinueHint);
            $("#infoDivTask6").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask6").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}

//! task6




//task 7


function selectImageTask7(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask7(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask7 = true;
                selectedPicIdTask7 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask7 = false;
                selectedPicIdTask7 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask7(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask7;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask7 && isEmpty)
        {
            // reset status
            picSelectedTask7 = false;
            canDeleteTask7 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask7 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask7).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask7).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask7 = clickedFieldId;
                readyToDeletePicIdTask7 = clickedFieldId;
                canDeleteTask7 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask7 = null;
                willCorrect = false;
                canDeleteTask7 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 2) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask7() {

    try
    {
        if (canDeleteTask7 && readyToDeletePicIdTask7 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask7).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask7).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask7 = null;
            canDeleteTask7 = false;
        }

        else
        {

            $("#infoDivTask7").html(selectBeforeDeleteHint);
            $("#infoDivTask7").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask7").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function switchToTask8() {

    try
    {
        if (canForwardToNext) {
            
            
            setTimeout(function () {

                $.mobile.changePage('#task8', {transition: "flip"});

            }, 1000);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask7").html(fillBeforeContinueHint);
            $("#infoDivTask7").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask7").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}



//! task7


//task 8


function selectImageTask8(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask8(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask8 = true;
                selectedPicIdTask8 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask8 = false;
                selectedPicIdTask8 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask8(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask8;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask8 && isEmpty)
        {
            // reset status
            picSelectedTask8 = false;
            canDeleteTask8 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask8 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask8).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask8).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask8 = clickedFieldId;
                readyToDeletePicIdTask8 = clickedFieldId;
                canDeleteTask8 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask8 = null;
                willCorrect = false;
                canDeleteTask8 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 2) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask8() {

    try
    {
        if (canDeleteTask8 && readyToDeletePicIdTask8 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask8).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask8).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask8 = null;
            canDeleteTask8 = false;
        }

        else
        {

            $("#infoDivTask8").html(selectBeforeDeleteHint);
            $("#infoDivTask8").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask8").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function switchToTask9() {

    try
    {
        if (canForwardToNext) {
            
            
            setTimeout(function () {

                $.mobile.changePage('#task9', {transition: "flip"});

            }, 1000);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask8").html(fillBeforeContinueHint);
            $("#infoDivTask8").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask8").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}



//! task8


//task 9


function selectImageTask9(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask9(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask9 = true;
                selectedPicIdTask9 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask9 = false;
                selectedPicIdTask9 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask9(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask9;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask9 && isEmpty)
        {
            // reset status
            picSelectedTask9 = false;
            canDeleteTask9 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask9 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask9).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask9).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask9 = clickedFieldId;
                readyToDeletePicIdTask9 = clickedFieldId;
                canDeleteTask9 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask9 = null;
                willCorrect = false;
                canDeleteTask9 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 4) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask9() {

    try
    {
        if (canDeleteTask9 && readyToDeletePicIdTask9 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask9).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask9).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask9 = null;
            canDeleteTask9 = false;
        }

        else
        {

            $("#infoDivTask9").html(selectBeforeDeleteHint);
            $("#infoDivTask9").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask9").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function switchToTask10() {

    try
    {
        if (canForwardToNext) {
            
            
            setTimeout(function () {

                $.mobile.changePage('#task10', {transition: "flip"});

            }, 1000);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask9").html(fillBeforeContinueHint);
            $("#infoDivTask9").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask9").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}



//! task9


//task 10


function selectImageTask10(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask10(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask10 = true;
                selectedPicIdTask10 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask10 = false;
                selectedPicIdTask10 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask10(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask10;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask10 && isEmpty)
        {
            // reset status
            picSelectedTask10 = false;
            canDeleteTask10 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask10 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask10).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask10).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask10 = clickedFieldId;
                readyToDeletePicIdTask10 = clickedFieldId;
                canDeleteTask10 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask10 = null;
                willCorrect = false;
                canDeleteTask10 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 4) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask10() {

    try
    {
        if (canDeleteTask10 && readyToDeletePicIdTask10 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask10).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask10).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask10 = null;
            canDeleteTask10 = false;
        }

        else
        {

            $("#infoDivTask10").html(selectBeforeDeleteHint);
            $("#infoDivTask10").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask10").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function switchToTask11() {

    try
    {
        if (canForwardToNext) {
            
            
            setTimeout(function () {

                $.mobile.changePage('#task11', {transition: "flip"});

            }, 1000);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask10").html(fillBeforeContinueHint);
            $("#infoDivTask10").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask10").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}



//! task10


//task 11


function selectImageTask11(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask11(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask11 = true;
                selectedPicIdTask11 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask11 = false;
                selectedPicIdTask11 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask11(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask11;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask11 && isEmpty)
        {
            // reset status
            picSelectedTask11 = false;
            canDeleteTask11 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask11 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask11).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask11).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask11 = clickedFieldId;
                readyToDeletePicIdTask11 = clickedFieldId;
                canDeleteTask11 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask11 = null;
                willCorrect = false;
                canDeleteTask11 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 4) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask11() {

    try
    {
        if (canDeleteTask11 && readyToDeletePicIdTask11 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask11).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask11).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask11 = null;
            canDeleteTask11 = false;
        }

        else
        {

            $("#infoDivTask11").html(selectBeforeDeleteHint);
            $("#infoDivTask11").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask11").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function switchToTask12() {

    try
    {
        if (canForwardToNext) {
            
            
            setTimeout(function () {

                $.mobile.changePage('#task12', {transition: "flip"});

            }, 1000);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask11").html(fillBeforeContinueHint);
            $("#infoDivTask11").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask11").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}



//! task11


//task 12


function selectImageTask12(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask12(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask12 = true;
                selectedPicIdTask12 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask12 = false;
                selectedPicIdTask12 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask12(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask12;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask12 && isEmpty)
        {
            // reset status
            picSelectedTask12 = false;
            canDeleteTask12 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask12 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask12).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask12).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask12 = clickedFieldId;
                readyToDeletePicIdTask12 = clickedFieldId;
                canDeleteTask12 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask12 = null;
                willCorrect = false;
                canDeleteTask12 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 4) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask12() {

    try
    {
        if (canDeleteTask12 && readyToDeletePicIdTask12 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask12).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask12).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask12 = null;
            canDeleteTask12 = false;
        }

        else
        {

            $("#infoDivTask12").html(selectBeforeDeleteHint);
            $("#infoDivTask12").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask12").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function switchToTask13() {

    try
    {
        if (canForwardToNext) {
            
            
            setTimeout(function () {

                $.mobile.changePage('#task13', {transition: "flip"});

            }, 1000);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask12").html(fillBeforeContinueHint);
            $("#infoDivTask12").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask12").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}



//! task12


//task 13


function selectImageTask13(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask13(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask13 = true;
                selectedPicIdTask13 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask13 = false;
                selectedPicIdTask13 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask13(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask13;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask13 && isEmpty)
        {
            // reset status
            picSelectedTask13 = false;
            canDeleteTask13 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask13 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask13).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask13).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask13 = clickedFieldId;
                readyToDeletePicIdTask13 = clickedFieldId;
                canDeleteTask13 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask13 = null;
                willCorrect = false;
                canDeleteTask13 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 9) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask13() {

    try
    {
        if (canDeleteTask13 && readyToDeletePicIdTask13 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask13).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask13).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask13 = null;
            canDeleteTask13 = false;
        }

        else
        {

            $("#infoDivTask13").html(selectBeforeDeleteHint);
            $("#infoDivTask13").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask13").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function switchToTask14() {

    try
    {
        if (canForwardToNext) {
            
            
            setTimeout(function () {

                $.mobile.changePage('#task14', {transition: "flip"});

            }, 1000);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask13").html(fillBeforeContinueHint);
            $("#infoDivTask13").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask13").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}



//! task13


//task 14


function selectImageTask14(clickedPic, choiceTableId) {

    var clickedPicId = clickedPic.id;
    var currentClass = $("#" + clickedPicId).attr('class');
    var allTds = choiceTableId.getElementsByTagName('td');
    var hasPic = $("#" + clickedPicId).children('img').length > 0;

    try
    {

        if (willCorrect && !hasPic)
        {
            selectTargetTask14(clickedPic);
            willCorrect = false;
            canForwardToNext = false;

        }

        else if (!willCorrect && hasPic)
        {

            if (currentClass !== "selectedTile")
            {
                // select pic
                $("#" + clickedPicId).attr("class", "selectedTile");
                picSelectedTask14 = true;
                selectedPicIdTask14 = clickedPicId;

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedPicId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

            }

            else
            {
                // deselect pic
                $("#" + clickedPicId).attr("class", "origFieldDemo");
                picSelectedTask14 = false;
                selectedPicIdTask14 = null;
            }

        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function selectTargetTask14(clickedField, targetsTable) {

    var clickedFieldId = clickedField.id;
    var allTds = targetsTable.getElementsByTagName('td');
    var currentClass = $("#" + clickedFieldId).attr('class');
    willCorrect = $("#" + clickedFieldId).children('img').length > 0 && !picSelectedTask14;
    var isEmpty = $("#" + clickedFieldId).children('img').length <= 0;

    try
    {
        // only if a pic was selected
        if (picSelectedTask14 && isEmpty)
        {
            // reset status
            picSelectedTask14 = false;
            canDeleteTask14 = false;

            // highlight target field
            $("#" + clickedFieldId).attr("class", "selectedTile");
            // move selected pic to target field
            setTimeout(function () {

                // not to same field
                if (selectedPicIdTask14 !== clickedFieldId)
                {
                    $("#" + selectedPicIdTask14).children('img').clone().appendTo("#" + clickedFieldId);

                    // remove highlighting from selected pic and target field
                    $("#" + selectedPicIdTask14).attr("class", "fieldBorder");
                    $("#" + clickedFieldId).attr("class", "fieldBorder");

                    // show correction hint

                }

            }, 100);


        }

        // if user will correct selection
        else if (willCorrect && !isEmpty)
        {
            // target field will be selected
            if (currentClass !== "selectedTile") {

                // highlight target field
                $("#" + clickedFieldId).attr("class", "selectedTile");

                // deselect other pics
                for (var i = 0; i < allTds.length; i++) {
                    var id = allTds[i].id;

                    if (id !== clickedFieldId) {

                        $('#' + id).attr('class', 'origFieldDemo');
                    }

                }

                selectedPicIdTask14 = clickedFieldId;
                readyToDeletePicIdTask14 = clickedFieldId;
                canDeleteTask14 = true;
            }

            // target field will be deselected
            else if (currentClass === "selectedTile") {
                // deselect target field
                $("#" + clickedFieldId).attr("class", "origFieldDemo");

                selectedPicIdTask14 = null;
                willCorrect = false;
                canDeleteTask14 = false;
            }




            canForwardToNext = false;
        }

        // check if 2 iamges are placed delayed
        setTimeout(function () {
            var placedPics = targetsTable.getElementsByTagName('img');
            if (placedPics.length === 9) {
                canForwardToNext = true;

            }
        }, 300);


    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }

}


function deleteSelectedPicTask14() {

    try
    {
        if (canDeleteTask14 && readyToDeletePicIdTask14 !== null) {
            // remove image from field
            $("#" + readyToDeletePicIdTask14).children('img').remove();
            // deselect field
            $("#" + readyToDeletePicIdTask14).attr("class", "origFieldDemo");

            willCorrect = false;
            readyToDeletePicIdTask14 = null;
            canDeleteTask14 = false;
        }

        else
        {

            $("#infoDivTask14").html(selectBeforeDeleteHint);
            $("#infoDivTask14").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask14").css("visibility", "hidden");

            }, infoDivDelay);
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function showEndPage() {

    try
    {
        if (canForwardToNext) {
            
            
            setTimeout(function () {

                $.mobile.changePage('#endPage', {transition: "flip"});

            }, 1000);

            canForwardToNext = false;
            willCorrect = false;

        }
        
        else
        {
            
            $("#infoDivTask14").html(fillBeforeContinueHint);
            $("#infoDivTask14").css("visibility", "visible");
            // hide info div after delay
            setTimeout(function () {

                $("#infoDivTask14").css("visibility", "hidden");

            }, infoDivDelay);
            
        }

    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}



//! task14