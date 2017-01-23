import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
	shouldReloadRecord() {
		console.log("shouldReloadRecord");
		return false;
	},

	shouldBackgroundReloadRecord(store, snapshot) {
		console.log("shouldBackgroundReloadRecord");
		const loadedAt = snapshot.record.get('loadedAt');

		// if it was loaded more than an hour ago
		if (Date.now() - loadedAt > 360000) {
			return true;
		} else {
			return false;
		}
	}
});
