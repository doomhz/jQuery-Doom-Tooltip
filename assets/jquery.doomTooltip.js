/**
* Doom Tooltip jQuery Plugin
*
* @author Dumitru Glavan
* @link http://dumitruglavan.com
* @version 1.0
* @requires jQuery v1.3.2 or later
*
* @example: $('#tip-pointer').doomTooltip({
*				tipId:'#doom-tooltip-auto',
*				headerText: 'Doom Tooltip Header',
*				text:'Great success from the dark side content text :)',
*				footerText: 'Doom Tooltip Footer',
*				hideTime:2000
*			});
* @example: $('#tip-pointer').doomTooltip({
*				tipId:'#doom-tooltip-click',
*				headerText: 'Doom Tooltip Header',
*				text:'Great success from the dark side content text :)',
*				footerText: 'Doom Tooltip Footer',
*				hideTime:false,
*				hideOnClick:true
*			});
*
* Examples and documentation at: https://github.com/doomhz/jQuery-Doom-Tooltip
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
*/
(function ($) {
	$.fn.doomTooltip = function (options) {
		var self = this;

		this.config = {tipId:'',
					  text:'',
					  hideTime:5000,
					  fadeTime:500,
					  hideOnClick: false,
					  style: {'position':'absolute'},
					  headerText: '',
					  footerText: '',
					  tooltipHtml: '<div class="tool-tip" id="{tipId}">\n\
										<div class="tool-tip-header">{tipHeaderText}</div>\n\
										<div class="tool-tip-text">{tipText}</div>\n\
										<div class="tool-tip-bottom">{tipFooterText}</div>\n\
									</div>'
					 };
		this.config = $.extend(this.config, options);
		this.config.tipId = !this.config.tipId ? 'tool-tip-' + new Date().getTime() : this.config.tipId.replace('#', '');
		this.tipContainer = $(this.config.tooltipHtml
							 .replace('{tipId}', this.config.tipId)
							 .replace('{tipHeaderText}', this.config.headerText)
							 .replace('{tipFooterText}', this.config.footerText)
							 .replace('{tipText}', this.config.text)
						    ).css(this.config.style).hide().prependTo('body');

		var pointerOffset = $(this).offset();
		pointerOffset = {
			left: (pointerOffset.left + parseInt($(this).width()/2) - parseInt(this.tipContainer.width()/2)),
			top: pointerOffset.top + parseInt($(this).height())
		};
		this.tipContainer.offset(pointerOffset).fadeTo(this.config.fadeTime, 1);

		if (this.config.hideTime) {
			setTimeout(function () {self.hideTooltip();}, self.config.hideTime);
		}

		if (this.config.hideOnClick) {
			this.tipContainer.click(function () {
				self.hideTooltip();
			});
		}

		return this;
	},

	$.fn.hideTooltip = function () {
		$(this.tipContainer).fadeTo(this.config.fadeTime, 0).delay(this.config.fadeTime).queue(function () {$(this).remove();});
	}
})(jQuery);