// ==UserScript==
// @name           hatena_star_utils
// @namespace      http://www.scrapcode.net/
// @include        http://*
// @include        https://*
// @version        1.0.0
// ==/UserScript==
location.href = 'javascript:(' + (function() {

    // Select utility
    var runUtils = [
        // スターコメントの重複送信防止
        { name: 'blockDuplicationStarComment', args: {} },

        // 文字列選択中の引用ハイライトをしないようにする
        { name: 'stopHighlight', args: {} },
    ];

    if( typeof( Hatena ) == 'undefined' ) return;
    if( typeof( Hatena.Star ) == 'undefined' ) return;

    var s = Hatena.Star;
    var utils = {};

    utils.blockDuplicationStarComment = {
        func: function ( args ) {
            if( typeof( s.CommentScreen ) == 'undefined' ) return;

            var pt = s.CommentScreen.prototype;

            var sendComment = pt.sendComment;
            pt.sendComment = function( e ) {
                this.submit.disabled = true;
                sendComment.call( this, e );
            };

            var receiveResult = pt.receiveResult;
            pt.receiveResult = function( args ) {
                this.submit.disabled = false;
                receiveResult.call( this, args );
            };

            var showComments = pt.showComments;
            pt.showComments = function( e, pos ) {
                if( this.submit ) this.submit.disabled = false;
                showComments.call( this, e, pos );
            };
        },
    };

    utils.stopHighlight = {
        func: function ( args ) {
            if( typeof( s.Star ) == 'undefined' ) return;

            var pt = s.Star.prototype;

            var showName = pt.showName;
            pt.showName = function( e ) {
                if( Ten.DOM.getSelectedText() == '' ) {
                    showName.call( this, e );
                    return;
                }

                var highlight = this.highlight;
                this.highlight = null;
                showName.call( this, e );
                this.highlight = highlight;
            };
        },
    };

    for( var i = 0; i < runUtils.length; ++i ) {
        var target = runUtils[i];
        var util   = utils[ target.name ];
        if( util.func ) {
            util.func( target.args );
        }
    }

}).toString() + ')()';

