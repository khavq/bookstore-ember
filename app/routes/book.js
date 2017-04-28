import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import InfinityRoute from "ember-infinity/mixins/route";
// import RouteMixin from 'ember-cli-pagination/remote/route-mixin';


export default Ember.Route.extend(InfinityRoute, {
    _minId: undefined,
    _minUpdatedAt: undefined,
    _canLoadMore: true,

    queryParams: {
        limit: {
            refreshModel: true
        },
        search: {
            refreshModel: true
        }
    },
    totalPagesParam: "meta.total-pages", // instead of "meta.total_pages"

    model(params) {
        // console.log(params);
        // return this.store.query('book', params);
        //var search = this.get('txt_search');
        return this.infinityModel("book", params, {
            min_id: '_minId',
            min_updated_at: '_minUpdatedAt'
        });
        // return this.findPaged('book', params);
    },

    afterInfinityModel(books) {
        let loadedAny = books.get('length') > 0;
        this.set('_canLoadMore', loadedAny);

        this.set('_minId', books.get('lastObject.id'));
        this.set('_minUpdatedAt', books.get('lastObject.updated_at'));

        // debugger
    },

    actions: {
        showAll() {
            // const total = this.controllerFor('books').get('total');
            // this.transitionTo({ queryParams: {limit: total}});
        },

        filteredArticles() {

            const search = this.controllerFor('books').get('search');
            console.log("search:", search);
            // return this.infinityModel("book", { perPage: 12, startingPage: 1, search: "" });
            this.transitionTo({ queryParams: { search: search } });
        },

        handleFilterEntry() {
            // let filterInputValue = this.get('value');
            // let filterAction = this.get('filter');
            // filterAction(filterInputValue).then((filterResults) => this.set('results', filterResults));
        }
    }
});
