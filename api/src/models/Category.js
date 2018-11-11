import { Model } from 'objection';
import objectionSlug from 'objection-slug';

const slug = objectionSlug({
  sourceField: 'name',
  slugField: 'slug',
});

export const schema = {
  type: 'object',
  required: ['name', 'slug'],

  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    slug: { type: 'string' },
  },
};

export default class Category extends slug(Model) {
  static tableName = 'categories';

  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: this.allModels().Post,
        join: {
          from: 'categories.id',
          to: 'posts.categoryId',
        },
      },
    };
  }

  static get jsonSchema() {
    return schema;
  }
}
