/*  Platfora challenge -  Afshin Mokhtari
 */

 

'use strict';

(function(){
	
	var $ = function( selector ) {								// Provide a shortcut alias for dom selection
			return document.querySelector( selector );
		},

		filesList = $( '.filesList' ),						// List where each new file will be show

		buttonAddNewFile = $( '.addNewFileBtn' ),		
		buttonDownloadAll = $( '.downloadAll' ),

		maxFilenameShowable = 35,
		downloadDelay = 200,											// delay amount for download simulation
		listingCount = 0;


	/* Add button callback - gets filename text from input box, adds it list in the UI,
	 *	attaches a click handler for its delete button.
	 */
	var addFilenameButtonHandler = function( e ) {
		var ul, li, fnameToAdd, html, newListing;

		ul = document.getElementsByName( 'fileToAdd' )[0];		// input box that holds filename
		fnameToAdd = ul.value;

		// Get filename to add, dont do anything if nothing in input box
    if ( fnameToAdd ) {
    	listingCount++;

	    li = makeFileListing( fnameToAdd );			// get the html to inject
	    filesList.appendChild( li );								// inject it
	    var newListing = $( '#l' + listingCount );	// get access to the node just created
	    // add delete button handler for element just created
	    newListing.getElementsByClassName( 'deleteIcon' )[0].onclick = deleteFilenameHandler;

	    ul.value = ''; 		// empty out input box
    }
	};


	/* Delete icon click handler for a list entry - 
	 *   Climbs up node tree to find particular <li> associated with this delete button
	 *   and removes whole thing from listings.
	 */
	var deleteFilenameHandler = function( e ) {
    e = e || window.event;
    var target = e.target || e.srcElement;

    var ul = target.parentNode.parentNode.parentNode;
		ul.removeChild( target.parentNode.parentNode );
	};


	/* 'Download All' button handler-
	 * Simulates downloading files - animates the progress bars.
	 * This version starts with the top file, waits a while, then starts  
	 * 'download' of next fileregardless of whether the previous one(s) are done or not.
	 */
	// var downloadAllHandler = function( e ) {
	// 	var list = $( '.filesList' ).getElementsByTagName( 'li' ),
	// 		entry,
	// 		i = 0;
		
	// 	function updateProgress( which ) {
	// 		if ( which.getElementsByTagName( 'progress' )[0].value < 95 ) {
	// 			which.getElementsByTagName( 'progress' )[0].value += getRandom(1, 20);
	// 			setTimeout( updateProgress, downloadDelay, which );
	// 		} else {
	// 			which.getElementsByTagName( 'progress' )[0].value = 100;
	// 		}
	// 	};

	// 	function iterate() {
	// 		updateProgress( list[i++] );
	// 		if ( i < list.length ) {
	// 			setTimeout( iterate, downloadDelay * 3 );
	// 		}
	// 	}

	// 	iterate();
	// };

	var downloadAllHandler = function( e ) {
		var list = $( '.filesList' ).getElementsByTagName( 'li' ),
			entry,
			i = 0;
		
		function updateProgress( which ) {
			if ( which.getElementsByTagName( 'progress' )[0].value < 95 ) {
				which.getElementsByTagName( 'progress' )[0].value += getRandom(1, 20);
				setTimeout( updateProgress, downloadDelay, which );
			} else {
				which.getElementsByTagName( 'progress' )[0].value = 100;
				if ( i < list.length) iterate();
			}
		};

		function iterate() {
			updateProgress( list[i++] );
		}

		iterate();
	};	


	// Helper function to return a random # between min & max,
	// Used by the 'download all' button  to simulate download progress.
	function getRandom(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}


	// Helper function to assemble an html snippet of given filename to be show
	// NOTE: I put together a string and letter set innerHTML, not sure if 
	// 	best practices dictate I createNodes and do it that way.
	function makeFileListing( filename ) {
		var li = document.createElement( 'li' );
		li.className = 'oneFile';

		if (! (listingCount % 2 ) ) {
			li.className += ' altBkgd';
		}

		li.setAttribute( 'id', 'l' + listingCount );
	
		var result = '',
			part2 = '<img class="fileIcon" src="img/file.png">\
				<span class="fileDescription">',  // filename gets injected here
			part3 = '</span>',
			part4 = '<span class="fileControls"> \
							<progress class="rounded" max="100" value="0"></progress> \
							<img class="deleteIcon" src="img/delete.png">\
						</span>';	

		if ( filename.length > maxFilenameShowable ) {
			filename = filename.substring(0, maxFilenameShowable-3) + '...';
		}

		result = part2 + filename + part3 + part4;
		li.innerHTML = result;

		return li;
	}


	buttonAddNewFile.onclick = addFilenameButtonHandler;
	buttonDownloadAll.onclick = downloadAllHandler;

})();