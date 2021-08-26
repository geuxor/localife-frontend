import { DatePicker, Select } from 'antd'
import moment from 'moment'

const { Option } = Select

const ExperienceEditForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
}) => {
  const { title, subtitle, description, location, price, quantity, from, to } =
    values

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />
        <input
          type="text"
          name="subtitle"
          onChange={handleChange}
          placeholder="SubTitle"
          className="form-control m-2"
          value={subtitle}
        />
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
          className="form-control m-2"
          value={description}
        />
        {location &&
          location.length &&
          {
            /* <AlgoliaPlaces
            className="form-control m-2"
            placeholder="Location"
            defaultValue={location}
            options={config}
            onChange={({ suggestion }) =>
              setValues({ ...values, location: suggestion.value })
            }
            style={{ height: "50px" }}
          /> */
          }}
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <input
          type="quantity"
          name="quantity"
          onChange={handleChange}
          placeholder="Quantity"
          className="form-control m-2"
          value={quantity}
        />

        {/* <Select
          labelInValue
          defaultValue={1}
          onChange={(value) => setValues({ ...values, quantity: value })}
          className="w-100 m-2"
          size="large"
          placeholder="Quantity"
          value={quantity}
        >
          <Option value={1}>Quantity</Option>
        </Select> */}
      </div>

      {from && (
        <DatePicker
          defaultValue={moment(from, 'YYYY-MM-DD')}
          placeholder="From date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, from: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, 'days')
          }
        />
      )}

      {to && (
        <DatePicker
          defaultValue={moment(to, 'YYYY-MM-DD')}
          placeholder="To date"
          className="form-control m-2"
          onChange={(date, dateString) =>
            setValues({ ...values, to: dateString })
          }
          disabledDate={(current) =>
            current && current.valueOf() < moment().subtract(1, 'days')
          }
        />
      )}

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  )
}

export default ExperienceEditForm
