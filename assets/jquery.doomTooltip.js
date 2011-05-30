/**
* Doom Tooltip jQuery Plugin
*
* @author Dumitru Glavan
* @link http://dumitruglavan.com
* @version 1.2
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
		var $self = $(this);

		if ($self.length > 1) {
			$self.each(function (i, el) {
				$(el).doomTooltip(options);
			});
			return this;
		}

		this.config = {
			tipId: '',
			text: '',
			position: 'bottom',
			showOnHover: true,
			hideOnOut: true,
			autoShow: false,
			autoRemove: false,
			autoHideTime: 0,
			fadeTime: 0,
			hideOnClick: false,
			style: {'position':'absolute'},
			topMargin: 5,
			headerText: '',
			footerText: '',
			tooltipHtml: '<div class="doom-tooltip-cnt" id="{tipId}">\n\
							<div class="doom-tooltip-header">{tipHeaderText}</div>\n\
							<div class="doom-tooltip-text">{tipText}</div>\n\
							<div class="doom-tooltip-footer">{tipFooterText}</div>\n\
						</div>',
			afterHide: null,
			offsetOnShow: false
		};
		this.config = $.extend(this.config, options);
		this.config.text = this.config.text === '' && $self.attr('data-tooltip-text') ? $self.attr('data-tooltip-text') : this.config.text;
		this.config.headerText = this.config.headerText === '' && $self.attr('data-tooltip-headerText') ? $self.attr('data-tooltip-headerText') : this.config.headerText;
		this.config.footerText = this.config.footerText === '' && $self.attr('data-tooltip-footerText') ? $self.attr('data-tooltip-footerText') : this.config.footerText;
		this.config.tipId = !this.config.tipId ? 'tool-tip-' + new Date().getTime() : this.config.tipId.replace('#', '');
		this.tipContainer = $(this.config.tooltipHtml
							 .replace('{tipId}', this.config.tipId)
							 .replace('{tipHeaderText}', this.config.headerText)
							 .replace('{tipFooterText}', this.config.footerText)
							 .replace('{tipText}', this.config.text)
						    ).css(this.config.style).hide().prependTo('body');

		this.setOffset();

		if (this.config.autoShow) {
			this.showTooltip();
		}

		if (this.config.autoHideTime) {
			setTimeout(function () {self.hideTooltip();}, self.config.autoHideTime);
		}

		if (this.config.showOnHover) {
			$self.mouseenter(function () {
				self.showTooltip();
			});
		}

		if (this.config.hideOnOut) {
			$self.mouseleave(function () {
				self.hideTooltip();
			});
		}

		if (this.config.hideOnClick) {
			this.tipContainer.click(function () {
				self.hideTooltip();
			});
		}

		return this;
	},

	$.fn.showTooltip = function () {
		if (this.config.offsetOnShow) {
			this.setOffset.call(this);
		}
		$(this.tipContainer).show().fadeTo(this.config.fadeTime, 1);
	},

	$.fn.hideTooltip = function () {
		var self = this
		$(this.tipContainer).fadeTo(this.config.fadeTime, 0, function () {
			$.isFunction(self.config.afterHide) && self.config.afterHide.call(self.tipContainer);
			self.config.autoRemove && self.tipContainer.remove();
			self.tipContainer.hide();
		});
	},

	$.fn.setOffset = function () {
		var $self = $(this), pointerOffset = $self.offset(), left = 0, top = 0;
		switch (this.config.position) {
			case 'left':
				left = pointerOffset.left - this.tipContainer.width() - this.config.topMargin;
				top = pointerOffset.top - parseInt($self.height()/2);
				break;
			case 'right':
				left = pointerOffset.left + $self.width() + this.config.topMargin;
				top = pointerOffset.top - parseInt($self.height()/2);
				break;
			case 'top':
				left = (pointerOffset.left + parseInt($self.width()/2) - parseInt(this.tipContainer.width()/2));
				top = pointerOffset.top - this.config.topMargin - this.tipContainer.height();
				break;
			default:
				left = (pointerOffset.left + parseInt($self.width()/2) - parseInt(this.tipContainer.width()/2));
				top = pointerOffset.top + parseInt($(this).height()) + this.config.topMargin;
				break;
		}

		pointerOffset = {
			top: top,
			left: left
		};
		this.tipContainer.css(pointerOffset);
	}

})(jQuery);