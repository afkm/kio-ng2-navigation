import { Component, Input } from '@angular/core';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        this.showsLogo = true;
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'content-head',
                    templateUrl: './head.component.html',
                    styleUrls: ['./head.component.css']
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return []; };
    HeaderComponent.propDecorators = {
        'showsLogo': [{ type: Input },],
    };
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=head.component.js.map