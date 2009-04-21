// ==UserScript==
// @name           hatena_star_comment_block_duplication
// @namespace      http://www.scrapcode.net/
// @include        http://*
// @include        https://*
// @version        1.0.0
// ==/UserScript==
location.href = 'javascript:(' + (function() {
    if( typeof( Hatena ) == 'undefined' ) return;
    if( typeof( Hatena.Star ) == 'undefined' ) return;
    if( typeof( Hatena.Star.CommentScreen ) == 'undefined' ) return;

    var sendComment = Hatena.Star.CommentScreen.prototype.sendComment;
    Hatena.Star.CommentScreen.prototype.sendComment = function( e ) {
        this.submit.disabled = true;
        sendComment.call( this, e );
    };

    var receiveResult = Hatena.Star.CommentScreen.prototype.receiveResult;
    Hatena.Star.CommentScreen.prototype.receiveResult = function( args ) {
        this.submit.disabled = false;
        receiveResult.call( this, args );
    };

    var showComments = Hatena.Star.CommentScreen.prototype.showComments;
    Hatena.Star.CommentScreen.prototype.showComments = function( e, pos ) {
        if( this.submit ) this.submit.disabled = false;
        showComments.call( this, e, pos );
    };
}).toString() + ')()';

