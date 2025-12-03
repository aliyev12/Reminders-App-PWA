<script lang="ts">
	const hsDatepicker = `
    {
    "type": "default",
    "dateMax": "2050-12-31",
    "styles": {
      "week": "vc-week flex pb-1.5",
      "weekDay": "vc-week__day m-px w-10 block font-normal text-center text-sm text-gray-500 focus:outline-hidden dark:text-neutral-500",
      "dates": "vc-dates grid grid-cols-7 gap-y-0.5",
      "date": "vc-date relative size-10.5 flex justify-center items-center text-sm text-gray-800 rounded-full hover:text-blue-600 [&>button]:relative [&>button]:size-full [&>button]:rounded-full nth-[7n]:rounded-r-full nth-[7n+1]:rounded-l-full before:absolute before:inset-0 before:size-full before:border before:border-transparent before:rounded-full hover:before:border-blue-600 hs-vc-date-selected:text-white hs-vc-date-today:bg-blue-600 hs-vc-date-today:text-white hs-vc-date-selected:hs-vc-date-month-prev:text-white hs-vc-date-selected:hs-vc-date-month-next:text-white hs-vc-date-selected:hs-vc-date-month-prev:hover:before:border-blue-600 hs-vc-date-selected:hs-vc-date-month-next:hover:before:border-blue-600 hs-vc-calendar-selected-middle:text-gray-800 hs-vc-calendar-selected-middle:hover:text-blue-600 hs-vc-calendar-selected-first:bg-gray-100 hs-vc-calendar-selected-first:rounded-l-full hs-vc-calendar-selected-first:rounded-r-none hs-vc-date-selected:before:bg-blue-600 hs-vc-calendar-selected-middle:bg-gray-100 hs-vc-calendar-selected-middle:before:bg-gray-100 hs-vc-calendar-selected-middle:rounded-none hs-vc-calendar-selected-last:bg-gray-100 hs-vc-calendar-selected-last:rounded-r-full hs-vc-calendar-selected-last:rounded-l-none hs-vc-date-selected:before:bg-blue-600 hs-vc-date-month-prev:text-gray-400 hs-vc-date-month-next:text-gray-400 hs-vc-date-month-prev:before:hover:border-gray-200 hs-vc-date-month-next:before:hover:border-gray-200 hs-vc-date-month-prev:hs-vc-calendar-selected-middle:text-gray-400 hs-vc-date-month-next:hs-vc-calendar-selected-middle:text-gray-400 hs-vc-date-month-prev:hs-vc-calendar-selected-middle:before:hover:border-gray-200 hs-vc-date-month-next:hs-vc-calendar-selected-middle:before:hover:border-gray-200 hs-vc-date-selected-first:hs-vc-date-month-prev:bg-transparent hs-vc-date-selected-first:hs-vc-date-month-next:bg-transparent hs-vc-date-selected-last:hs-vc-date-month-prev:bg-transparent hs-vc-date-selected-last:hs-vc-date-month-next:bg-transparent dark:text-neutral-200 dark:hover:text-blue-500 dark:hover:before:border-blue-500 dark:hs-vc-date-selected:text-white dark:hs-vc-date-selected:hs-vc-date-month-prev:text-white dark:hs-vc-date-selected:hs-vc-date-month-next:text-white dark:hs-vc-date-today:bg-blue-500 dark:hs-vc-date-today:text-white dark:hs-vc-date-selected:hs-vc-date-month-prev:hover:before:border-blue-500 dark:hs-vc-date-selected:hs-vc-date-month-next:hover:before:border-blue-500 dark:hs-vc-calendar-selected-middle:text-neutral-200 dark:hs-vc-calendar-selected-middle:hover:text-blue-500 dark:hs-vc-calendar-selected-first:bg-neutral-800 dark:hs-vc-date-selected:before:bg-blue-500 dark:hs-vc-calendar-selected-middle:bg-neutral-800 dark:hs-vc-calendar-selected-middle:before:bg-neutral-800 dark:hs-vc-calendar-selected-last:bg-neutral-800 dark:hs-vc-date-selected:before:bg-blue-500 dark:hs-vc-date-month-prev:text-neutral-600 dark:hs-vc-date-month-next:text-neutral-600 dark:hs-vc-date-month-prev:before:hover:border-neutral-700 dark:hs-vc-date-month-next:before:hover:border-neutral-700 dark:hs-vc-date-month-prev:hs-vc-calendar-selected-middle:text-neutral-600 dark:hs-vc-date-month-next:hs-vc-calendar-selected-middle:text-neutral-600 dark:hs-vc-date-month-prev:hs-vc-calendar-selected-middle:before:hover:border-neutral-700 dark:hs-vc-date-month-next:hs-vc-calendar-selected-middle:before:hover:border-neutral-700",
      "arrowPrev": "vc-arrow vc-arrow_prev size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
      "arrowNext": "vc-arrow vc-arrow_next size-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
    },
    "mode": "custom-select",
    "templates": {
      "arrowPrev": "<button data-vc-arrow=\"prev\"><svg class=\"shrink-0 size-4\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m15 18-6-6 6-6\"></path></svg></button>",
      "arrowNext": "<button data-vc-arrow=\"next\"><svg class=\"shrink-0 size-4\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m9 18 6-6-6-6\"></path></svg></button>"
    }
  }`;
</script>

<input
	class="hs-datepicker block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-600 focus:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:border-blue-500 dark:focus:ring-neutral-500"
	type="text"
	placeholder="Select day"
	readonly={undefined}
	data-hs-datepicker={hsDatepicker}
/>
