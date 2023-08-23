/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7sng9ym4o7s5j58")

  // remove
  collection.schema.removeField("d6qwxkyj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7au7lrda",
    "name": "content",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oc8zzla3",
    "name": "created_at",
    "type": "date",
    "required": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7sng9ym4o7s5j58")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d6qwxkyj",
    "name": "email",
    "type": "email",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // remove
  collection.schema.removeField("7au7lrda")

  // remove
  collection.schema.removeField("oc8zzla3")

  return dao.saveCollection(collection)
})
