if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/ast', 'esast/dist/mangle-identifier', 'esast/dist/specialize', './ast-constants', './ms-call'], function (exports, _esastDistAst, _esastDistMangleIdentifier, _esastDistSpecialize, _astConstants, _msCall) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mangleIdentifier = _interopRequireDefault(_esastDistMangleIdentifier);

	var _specialize = _interopRequireDefault(_esastDistSpecialize);

	const accessLocalDeclare = function (localDeclare) {
		return localDeclare.isLazy() ? (0, _msCall.msUnlazy)(idForDeclareCached(localDeclare)) : (0, _esastDistAst.Identifier)(idForDeclareCached(localDeclare).name);
	},
	      declare = function (localDeclare, val) {
		return (0, _esastDistSpecialize.variableDeclarationConst)([(0, _esastDistAst.VariableDeclarator)(idForDeclareCached(localDeclare), val)]);
	},
	      forStatementInfinite = (0, _specialize.default)(_esastDistAst.ForStatement, ['body', _esastDistAst.Statement], { init: null, test: null, update: null }),
	      idForDeclareCached = function (localDeclare) {
		let _ = declareToId.get(localDeclare);
		if (_ === undefined) {
			_ = (0, _esastDistAst.Identifier)((0, _mangleIdentifier.default)(localDeclare.name));
			declareToId.set(localDeclare, _);
		}
		return _;
	},
	      throwErrorFromString = function (msg) {
		return (0, _esastDistAst.ThrowStatement)((0, _esastDistAst.NewExpression)(_astConstants.IdError, [(0, _esastDistAst.Literal)(msg)]));
	};

	exports.accessLocalDeclare = accessLocalDeclare;
	exports.declare = declare;
	exports.forStatementInfinite = forStatementInfinite;
	exports.idForDeclareCached = idForDeclareCached;
	exports.throwErrorFromString = throwErrorFromString;
	const declareToId = new WeakMap();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3RyYW5zcGlsZS91dGlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFPTyxPQUNOLGtCQUFrQixHQUFHLFVBQUEsWUFBWTtTQUNoQyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQ3BCLFlBTE0sUUFBUSxFQUtMLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQzFDLGtCQVhvQixVQUFVLEVBV25CLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQztFQUFBO09BRW5ELE9BQU8sR0FBRyxVQUFDLFlBQVksRUFBRSxHQUFHO1NBQzNCLHlCQVhtQix3QkFBd0IsRUFXbEIsQ0FBRSxrQkFiWixrQkFBa0IsRUFhYSxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBRSxDQUFDO0VBQUE7T0FFeEYsb0JBQW9CLEdBQUcsdUNBaEJmLFlBQVksRUFpQm5CLENBQUUsTUFBTSxnQkFqQmlELFNBQVMsQ0FpQjdDLEVBQ3JCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztPQUUxQyxrQkFBa0IsR0FBRyxVQUFBLFlBQVksRUFBSTtBQUNwQyxNQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQ3JDLE1BQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtBQUNwQixJQUFDLEdBQUcsa0JBdkJnQixVQUFVLEVBdUJmLCtCQUFpQixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUNuRCxjQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQTtHQUNoQztBQUNELFNBQU8sQ0FBQyxDQUFBO0VBQ1I7T0FFRCxvQkFBb0IsR0FBRyxVQUFBLEdBQUc7U0FDekIsa0JBN0JELGNBQWMsRUE2QkUsa0JBOUIyQixhQUFhLGdCQUloRCxPQUFPLEVBMEJ3QixDQUFFLGtCQTlCUCxPQUFPLEVBOEJRLEdBQUcsQ0FBQyxDQUFFLENBQUMsQ0FBQztFQUFBLENBQUE7O1NBdEJ6RCxrQkFBa0IsR0FBbEIsa0JBQWtCO1NBS2xCLE9BQU8sR0FBUCxPQUFPO1NBR1Asb0JBQW9CLEdBQXBCLG9CQUFvQjtTQUlwQixrQkFBa0IsR0FBbEIsa0JBQWtCO1NBU2xCLG9CQUFvQixHQUFwQixvQkFBb0I7QUFHckIsT0FDQyxXQUFXLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS90cmFuc3BpbGUvdXRpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZvclN0YXRlbWVudCwgSWRlbnRpZmllciwgTGl0ZXJhbCwgTmV3RXhwcmVzc2lvbiwgU3RhdGVtZW50LFxuXHRUaHJvd1N0YXRlbWVudCwgVmFyaWFibGVEZWNsYXJhdG9yIH0gZnJvbSAnZXNhc3QvZGlzdC9hc3QnXG5pbXBvcnQgbWFuZ2xlSWRlbnRpZmllciBmcm9tICdlc2FzdC9kaXN0L21hbmdsZS1pZGVudGlmaWVyJ1xuaW1wb3J0IHNwZWNpYWxpemUsIHsgdmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0IH0gZnJvbSAnZXNhc3QvZGlzdC9zcGVjaWFsaXplJ1xuaW1wb3J0IHsgSWRFcnJvciB9IGZyb20gJy4vYXN0LWNvbnN0YW50cydcbmltcG9ydCB7IG1zVW5sYXp5IH0gZnJvbSAnLi9tcy1jYWxsJ1xuXG5leHBvcnQgY29uc3Rcblx0YWNjZXNzTG9jYWxEZWNsYXJlID0gbG9jYWxEZWNsYXJlID0+XG5cdFx0bG9jYWxEZWNsYXJlLmlzTGF6eSgpID9cblx0XHRcdG1zVW5sYXp5KGlkRm9yRGVjbGFyZUNhY2hlZChsb2NhbERlY2xhcmUpKSA6XG5cdFx0XHRJZGVudGlmaWVyKGlkRm9yRGVjbGFyZUNhY2hlZChsb2NhbERlY2xhcmUpLm5hbWUpLFxuXG5cdGRlY2xhcmUgPSAobG9jYWxEZWNsYXJlLCB2YWwpID0+XG5cdFx0dmFyaWFibGVEZWNsYXJhdGlvbkNvbnN0KFsgVmFyaWFibGVEZWNsYXJhdG9yKGlkRm9yRGVjbGFyZUNhY2hlZChsb2NhbERlY2xhcmUpLCB2YWwpIF0pLFxuXG5cdGZvclN0YXRlbWVudEluZmluaXRlID0gc3BlY2lhbGl6ZShGb3JTdGF0ZW1lbnQsXG5cdFx0WyAnYm9keScsIFN0YXRlbWVudCBdLFxuXHRcdHsgaW5pdDogbnVsbCwgdGVzdDogbnVsbCwgdXBkYXRlOiBudWxsIH0pLFxuXG5cdGlkRm9yRGVjbGFyZUNhY2hlZCA9IGxvY2FsRGVjbGFyZSA9PiB7XG5cdFx0bGV0IF8gPSBkZWNsYXJlVG9JZC5nZXQobG9jYWxEZWNsYXJlKVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpIHtcblx0XHRcdF8gPSBJZGVudGlmaWVyKG1hbmdsZUlkZW50aWZpZXIobG9jYWxEZWNsYXJlLm5hbWUpKVxuXHRcdFx0ZGVjbGFyZVRvSWQuc2V0KGxvY2FsRGVjbGFyZSwgXylcblx0XHR9XG5cdFx0cmV0dXJuIF9cblx0fSxcblxuXHR0aHJvd0Vycm9yRnJvbVN0cmluZyA9IG1zZyA9PlxuXHRcdFRocm93U3RhdGVtZW50KE5ld0V4cHJlc3Npb24oSWRFcnJvciwgWyBMaXRlcmFsKG1zZykgXSkpXG5cbmNvbnN0XG5cdGRlY2xhcmVUb0lkID0gbmV3IFdlYWtNYXAoKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=