/* 
 * This script contains the interaction and flow logic of the tast: Mosaiktest
 */




function onShowDemo(){
    try
    {
        $.mobile.changePage('#mosaiktestDemo1', {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}


function onShowActiveDemo(){
    try
    {
        $.mobile.changePage('#mosaiktestDemo4', {transition: "flip"});
    }

    catch (error) {
        console.log("An error has been occured! " + error);
    }
}