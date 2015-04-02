import assert from 'assert'
import { blue, green, magenta, bold } from 'chalk'
import CompileError, { Warning, formatCode } from './CompileError'
import Opts from './Opts'
import type from './U/type'

export default (error, modulePath) => format(error.warning, modulePath, 'error')

export const formatWarningForConsole = (warning, modulePath) => {
	type(warning, Warning, modulePath, String)
	// Extra space to match up with 'error'
	return format(warning, modulePath, 'warn ')
}

const format = (warning, modulePath, kind) => {
	const message = formatCode(warning.message, green)
	return `${blue(modulePath)}\n${magenta(kind)} ${bold.red(warning.span)} ${message}`
}