<template>
  <i-page>
    <i-box>
      <i-form
        direction="horizontal"
        :hasDivider="true">

        <i-form-item
          label="Normal"
          name="item1"
          type="text"></i-form-item>

        <i-form-item
          label="Help Text"
          name="item2"
          helpText="A block of help text that breaks onto a new line and may extend beyond one line."
          type="text"></i-form-item>

        <i-form-item
          name="item3"
          label="Password"
          type="password"></i-form-item>

        <i-form-item
          name="item4"
          label="Placeholder"
          type="text"
          placeholder="Placeholder"></i-form-item>

        <i-form-item
          name="item5"
          label="Disabled"
          type="text"
          value="disabled value"
          :disabled="true"></i-form-item>

        <i-form-item
          name="item6"
          label="Static"
          type="static"
          value="email@example.com"></i-form-item>

        <i-form-item
          name="item7"
          label="Radio"
          type="radio"
          :options="['123', '234', '345']"
          value="123"></i-form-item>

        <i-form-item
          name="item8"
          label="Checkbox"
          type="checkbox"
          :options="['123', '234', '345']"
          :value="['123', '234']"></i-form-item>

        <i-form-item
          label="With validator"
          name="item9"
          type="text"
          placeholder="Try type more than 6 words"
          :validator="[
            { fn : value => value.length < 2, message : 'length can not longer than 2.'},
            { fn : value => value.length < 4, message : 'length can not longer than 4.'},
            { fn : value => value.length < 6, message : 'length can not longer than 6.'},
            ]"></i-form-item>

      </i-form>
    </i-box>
  </i-page>
</template>
